import { expect, test } from '../fixtures';
import { uniqueSku, uniqueSuffix } from '../helpers/unique';

test.describe('API produtos', () => {
  test('lista produtos com paginação', async ({ request, auth }) => {
    const response = await request.get('/api/produtos?limit=5', { headers: auth });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.meta.limit).toBe(5);
  });

  test('cria, atualiza e remove produto', async ({ request, auth }) => {
    const suffix = uniqueSuffix();
    const payload = {
      sku: uniqueSku('API'),
      titulo: `Produto E2E ${suffix}`,
      preco: 199.9,
      estoque: 12,
    };

    const created = await request.post('/api/produtos', { data: payload, headers: auth });
    expect(created.status()).toBe(201);
    const produto = await created.json();
    expect(produto).toMatchObject({
      sku: payload.sku,
      titulo: payload.titulo,
      estoque: payload.estoque,
    });

    const updated = await request.put(`/api/produtos/${produto.id}`, {
      data: { estoque: 25, preco: 210 },
      headers: auth,
    });
    expect(updated.ok()).toBeTruthy();
    const body = await updated.json();
    expect(Number(body.estoque)).toBe(25);
    expect(Number(body.preco)).toBe(210);

    const removed = await request.delete(`/api/produtos/${produto.id}`, { headers: auth });
    expect(removed.status()).toBe(204);
  });
});
