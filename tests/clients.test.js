'use strict';

const {
  request,
  app,
  sequelize,
  Client,
  resetDatabase,
  seedClients,
  seedProducts,
  seedOrder,
  makeCpf,
  authenticatedAgent,
} = require('./helpers');

describe('Clientes (web)', () => {
  let agent;

  beforeEach(async () => {
    await resetDatabase();
    agent = await authenticatedAgent();
  });

  afterAll(() => sequelize.close());

  it('lista com filtro, ordenação e paginação', async () => {
    await seedClients(12);

    const list = await agent.get('/clients');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Mostrando 1–12 de 12');

    const pageTwo = await agent.get('/clients?per_page=10&page=2');
    expect(pageTwo.text).toContain('Mostrando 11–12 de 12');

    const filtered = await agent.get(
      `/clients?name=${encodeURIComponent('Cliente 05')}`,
    );
    expect(filtered.text).toContain('Cliente 05');
    expect(filtered.text).not.toContain('Cliente 04');

    const sorted = await agent.get('/clients?sort=name&dir=desc&per_page=100');
    expect(sorted.text.indexOf('Cliente 12')).toBeLessThan(
      sorted.text.indexOf('Cliente 11'),
    );
  });

  it('exibe mensagem quando o filtro não retorna resultados', async () => {
    const response = await agent.get('/clients?name=inexistente');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Nenhum cliente encontrado');
  });

  it('cria cliente normalizando CPF e e-mail', async () => {
    const cpf = makeCpf(90);
    const formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9,
    )}-${cpf.slice(9)}`;

    const response = await agent.post('/clients').type('form').send({
      name: 'Novo Cliente',
      cpf: formattedCpf,
      email: 'NOVO.CLIENTE@TESTE.COM',
    });

    expect(response.status).toBe(302);
    expect(response.headers.location).toMatch(/^\/clients\/\d+$/);

    const client = await Client.findOne({
      where: { email: 'novo.cliente@teste.com' },
    });

    expect(client).not.toBeNull();
    expect(client.cpf).toBe(cpf);
  });

  it('valida os campos obrigatórios com 422', async () => {
    const response = await agent.post('/clients').type('form').send({
      name: 'ab',
      cpf: '123',
      email: 'invalido',
    });

    expect(response.status).toBe(422);
    expect(response.text).toContain('O nome deve ter entre 3 e 150');
    expect(response.text).toContain('O CPF deve conter 11 dígitos');
    expect(response.text).toContain('Informe um e-mail válido');
  });

  it('bloqueia CPF e e-mail duplicados', async () => {
    const [client] = await seedClients(1);

    const duplicateCpf = await agent.post('/clients').type('form').send({
      name: 'Outro Cliente',
      cpf: client.cpf,
      email: 'outro@teste.com',
    });
    expect(duplicateCpf.status).toBe(422);
    expect(duplicateCpf.text).toContain('Já existe um cliente com este CPF');

    const duplicateEmail = await agent.post('/clients').type('form').send({
      name: 'Mais um Cliente',
      cpf: makeCpf(91),
      email: client.email.toUpperCase(),
    });
    expect(duplicateEmail.status).toBe(422);
    expect(duplicateEmail.text).toContain('Já existe um cliente com este e-mail');
  });

  it('atualiza um cliente', async () => {
    const [client] = await seedClients(1);

    const response = await agent.put(`/clients/${client.id}`).type('form').send({
      name: 'Cliente Atualizado',
      cpf: client.cpf,
      email: client.email,
    });

    expect(response.status).toBe(302);

    await client.reload();
    expect(client.name).toBe('Cliente Atualizado');
  });

  it('exclui cliente sem pedidos', async () => {
    const [client] = await seedClients(1);

    const response = await agent.delete(`/clients/${client.id}`);

    expect(response.status).toBe(302);
    expect(await Client.findByPk(client.id)).toBeNull();
  });

  it('bloqueia exclusão de cliente com pedidos', async () => {
    const [client] = await seedClients(1);
    const [product] = await seedProducts(1);
    await seedOrder({ client, items: [{ product, quantity: 1 }] });

    const response = await agent.delete(`/clients/${client.id}`);

    expect(response.status).toBe(302);
    expect(await Client.findByPk(client.id)).not.toBeNull();

    const list = await agent.get('/clients');
    expect(list.text).toContain(
      'Não é possível excluir um cliente que possui pedidos vinculados',
    );
  });

  it('exclui em massa apenas clientes sem pedidos', async () => {
    const [withOrder, free] = await seedClients(2);
    const [product] = await seedProducts(1);
    await seedOrder({ client: withOrder, items: [{ product, quantity: 1 }] });

    const response = await agent
      .post('/clients/bulk-delete')
      .type('form')
      .send({ ids: [withOrder.id, free.id] });

    expect(response.status).toBe(302);
    expect(await Client.findByPk(free.id)).toBeNull();
    expect(await Client.findByPk(withOrder.id)).not.toBeNull();

    const list = await agent.get('/clients');
    expect(list.text).toContain('1 cliente(s) excluído(s)');
    expect(list.text).toContain('1 cliente(s) não puderam ser excluídos');
  });

  it('retorna 404 para cliente inexistente', async () => {
    const show = await agent.get('/clients/999999');
    const edit = await agent.get('/clients/999999/edit');

    expect(show.status).toBe(404);
    expect(edit.status).toBe(404);
  });
});
