import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '../fixtures';
import { uniqueCpf, uniqueEmail, uniqueSku, uniqueSuffix } from '../helpers/unique';

async function createCliente(request: APIRequestContext, auth: Record<string, string>) {
  const suffix = uniqueSuffix();
  const response = await request.post('/api/clientes', {
    headers: auth,
    data: {
      nome: `Pedido Cliente ${suffix}`,
      cpf: uniqueCpf(suffix),
      email: uniqueEmail('pedido'),
    },
  });
  expect(response.status()).toBe(201);
  return response.json();
}

async function createProduto(request: APIRequestContext, auth: Record<string, string>) {
  const suffix = uniqueSuffix();
  const response = await request.post('/api/produtos', {
    headers: auth,
    data: {
      sku: uniqueSku('PED'),
      titulo: `Produto Pedido ${suffix}`,
      preco: 89.9,
      estoque: 40,
    },
  });
  expect(response.status()).toBe(201);
  return response.json();
}

test.describe('API pedidos', () => {
  test('lista pedidos', async ({ request, auth }) => {
    const response = await request.get('/api/pedidos?limit=10', { headers: auth });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.meta.total).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('itens');
  });

  test('cria pedido com itens, atualiza status e remove', async ({ request, auth }) => {
    const cliente = await createCliente(request, auth);
    const produto = await createProduto(request, auth);

    const created = await request.post('/api/pedidos', {
      headers: auth,
      data: {
        cliente_id: cliente.id,
        status: 'Em Aberto',
        desconto: 5,
        itens: [{ produto_id: produto.id, quantidade: 2 }],
      },
    });
    expect(created.status()).toBe(201);
    const pedido = await created.json();
    expect(pedido.status).toBe('Em Aberto');
    expect(pedido.itens).toHaveLength(1);
    expect(pedido.itens[0].quantidade).toBe(2);

    const updated = await request.put(`/api/pedidos/${pedido.id}`, {
      headers: auth,
      data: {
        status: 'Pago',
        desconto: 10,
        itens: [{ produto_id: produto.id, quantidade: 3 }],
      },
    });
    expect(updated.ok()).toBeTruthy();
    const updatedBody = await updated.json();
    expect(updatedBody.status).toBe('Pago');
    expect(Number(updatedBody.desconto)).toBe(10);
    expect(updatedBody.itens[0].quantidade).toBe(3);

    const filtered = await request.get('/api/pedidos?status=Pago&limit=100', { headers: auth });
    expect(filtered.ok()).toBeTruthy();
    const filteredBody = await filtered.json();
    expect(filteredBody.data.some((item: { id: number }) => item.id === pedido.id)).toBeTruthy();

    const removed = await request.delete(`/api/pedidos/${pedido.id}`, { headers: auth });
    expect(removed.status()).toBe(204);
  });
});
