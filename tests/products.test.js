'use strict';

const {
  sequelize,
  Product,
  resetDatabase,
  seedClients,
  seedProducts,
  seedOrder,
  authenticatedAgent,
} = require('./helpers');

describe('Produtos (web)', () => {
  let agent;

  beforeEach(async () => {
    await resetDatabase();
    agent = await authenticatedAgent();
  });

  afterAll(() => sequelize.close());

  it('lista com filtro, ordenação e paginação', async () => {
    await seedProducts(12);

    const list = await agent.get('/products');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Mostrando 1–12 de 12');

    const pageTwo = await agent.get('/products?per_page=10&page=2');
    expect(pageTwo.text).toContain('Mostrando 11–12 de 12');

    const filtered = await agent.get(
      `/products?title=${encodeURIComponent('Produto 05')}`,
    );
    expect(filtered.text).toContain('Produto 05');
    expect(filtered.text).not.toContain('Produto 04');

    const sorted = await agent.get('/products?sort=price&dir=desc&per_page=100');
    expect(sorted.text.indexOf('Produto 12')).toBeLessThan(
      sorted.text.indexOf('Produto 11'),
    );
  });

  it('filtra por faixa de preço e estoque', async () => {
    await seedProducts(5);

    const response = await agent.get(
      '/products?min_price=200&max_price=400&min_stock=11&max_stock=13',
    );

    expect(response.status).toBe(200);
    expect(response.text).toContain('Produto 02');
    expect(response.text).toContain('Produto 03');
    expect(response.text).not.toContain('Produto 01');
  });

  it('cria produto normalizando o SKU em maiúsculas', async () => {
    const response = await agent.post('/products').type('form').send({
      sku: 'sku-novo',
      title: 'Produto Novo',
      price: '99.90',
      stock: '7',
    });

    expect(response.status).toBe(302);

    const product = await Product.findOne({ where: { sku: 'SKU-NOVO' } });
    expect(product).not.toBeNull();
    expect(Number(product.price)).toBe(99.9);
    expect(product.stock).toBe(7);
  });

  it('valida os campos com 422', async () => {
    const response = await agent.post('/products').type('form').send({
      sku: '',
      title: 'a',
      price: '-1',
      stock: '-5',
    });

    expect(response.status).toBe(422);
    expect(response.text).toContain('Informe o SKU');
    expect(response.text).toContain('O título deve ter entre 2 e 100');
    expect(response.text).toContain('preço válido');
    expect(response.text).toContain('estoque válido');
  });

  it('bloqueia SKU duplicado sem diferenciar maiúsculas', async () => {
    const [product] = await seedProducts(1);

    const response = await agent.post('/products').type('form').send({
      sku: product.sku.toLowerCase(),
      title: 'Outro Produto',
      price: '10',
      stock: '1',
    });

    expect(response.status).toBe(422);
    expect(response.text).toContain('Já existe um produto com este SKU');
  });

  it('atualiza um produto', async () => {
    const [product] = await seedProducts(1);

    const response = await agent
      .put(`/products/${product.id}`)
      .type('form')
      .send({
        sku: product.sku,
        title: 'Produto Atualizado',
        price: '150.50',
        stock: '3',
      });

    expect(response.status).toBe(302);

    await product.reload();
    expect(product.title).toBe('Produto Atualizado');
    expect(Number(product.price)).toBe(150.5);
    expect(product.stock).toBe(3);
  });

  it('bloqueia exclusão de produto usado em pedido', async () => {
    const [client] = await seedClients(1);
    const [product] = await seedProducts(1);
    await seedOrder({ client, items: [{ product, quantity: 1 }] });

    const response = await agent.delete(`/products/${product.id}`);

    expect(response.status).toBe(302);
    expect(await Product.findByPk(product.id)).not.toBeNull();

    const list = await agent.get('/products');
    expect(list.text).toContain(
      'Não é possível excluir um produto que está em pedidos vinculados',
    );
  });

  it('exclui em massa apenas produtos sem pedidos', async () => {
    const [client] = await seedClients(1);
    const [used, free] = await seedProducts(2);
    await seedOrder({ client, items: [{ product: used, quantity: 1 }] });

    const response = await agent
      .post('/products/bulk-delete')
      .type('form')
      .send({ ids: [used.id, free.id] });

    expect(response.status).toBe(302);
    expect(await Product.findByPk(free.id)).toBeNull();
    expect(await Product.findByPk(used.id)).not.toBeNull();

    const list = await agent.get('/products');
    expect(list.text).toContain('1 produto(s) excluído(s)');
    expect(list.text).toContain('1 produto(s) não puderam ser excluídos');
  });

  it('retorna 404 para produto inexistente', async () => {
    const show = await agent.get('/products/999999');
    const edit = await agent.get('/products/999999/edit');

    expect(show.status).toBe(404);
    expect(edit.status).toBe(404);
  });
});
