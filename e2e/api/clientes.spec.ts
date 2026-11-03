import { expect, test } from '../fixtures';
import { uniqueCpf, uniqueEmail, uniqueSuffix } from '../helpers/unique';

test.describe('API clientes', () => {
  test('lista clientes com paginação', async ({ request, auth }) => {
    const response = await request.get('/api/clientes?limit=10&page=1', { headers: auth });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.meta).toMatchObject({
      page: 1,
      limit: 10,
    });
    expect(body.meta.total).toBeGreaterThan(0);
  });

  test('cria, busca, atualiza e remove cliente', async ({ request, auth }) => {
    const suffix = uniqueSuffix();
    const payload = {
      nome: `Cliente E2E ${suffix}`,
      cpf: uniqueCpf(suffix),
      email: uniqueEmail('cliente'),
    };

    const created = await request.post('/api/clientes', { data: payload, headers: auth });
    expect(created.status()).toBe(201);
    const cliente = await created.json();
    expect(cliente).toMatchObject(payload);

    const byId = await request.get(`/api/clientes/${cliente.id}`, { headers: auth });
    expect(byId.ok()).toBeTruthy();
    await expect(byId.json()).resolves.toMatchObject({ id: cliente.id, nome: payload.nome });

    const updatedName = `${payload.nome} Editado`;
    const updated = await request.put(`/api/clientes/${cliente.id}`, {
      data: { nome: updatedName },
      headers: auth,
    });
    expect(updated.ok()).toBeTruthy();
    await expect(updated.json()).resolves.toMatchObject({ id: cliente.id, nome: updatedName });

    const search = await request.get(`/api/clientes?q=${encodeURIComponent(updatedName)}`, {
      headers: auth,
    });
    expect(search.ok()).toBeTruthy();
    const searchBody = await search.json();
    expect(searchBody.data.some((item: { id: number }) => item.id === cliente.id)).toBeTruthy();

    const removed = await request.delete(`/api/clientes/${cliente.id}`, { headers: auth });
    expect(removed.status()).toBe(204);

    const missing = await request.get(`/api/clientes/${cliente.id}`, { headers: auth });
    expect(missing.status()).toBe(404);
  });

  test('exclui clientes em massa', async ({ request, auth }) => {
    const createdIds: number[] = [];
    for (let i = 0; i < 2; i += 1) {
      const suffix = uniqueSuffix() + i;
      const response = await request.post('/api/clientes', {
        headers: auth,
        data: {
          nome: `Bulk Cliente ${suffix}`,
          cpf: uniqueCpf(suffix),
          email: uniqueEmail(`bulk${i}`),
        },
      });
      expect(response.status()).toBe(201);
      createdIds.push((await response.json()).id);
    }

    const bulk = await request.post('/api/clientes/bulk-delete', {
      headers: auth,
      data: { ids: createdIds },
    });
    expect(bulk.ok()).toBeTruthy();
    await expect(bulk.json()).resolves.toMatchObject({ deleted: 2 });
  });

  test('rejeita payload inválido', async ({ request, auth }) => {
    const response = await request.post('/api/clientes', {
      headers: auth,
      data: { nome: '', cpf: '123', email: 'nao-email' },
    });
    expect(response.status()).toBe(400);
  });

  test('exige autenticação', async ({ request }) => {
    const response = await request.get('/api/clientes');
    expect(response.status()).toBe(401);
  });
});
