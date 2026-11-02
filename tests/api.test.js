'use strict';

const {
  sequelize,
  request,
  app,
  Client,
  Product,
  Order,
  OrderItem,
  makeCpf,
  resetDatabase,
  seedClients,
  seedProducts,
  seedOrder,
} = require('./helpers');

const API = '/api/v1';

function clientPayload(index, overrides = {}) {
  return {
    name: `API Cliente ${index}`,
    cpf: makeCpf(index),
    email: `api.cliente${index}@teste.com`,
    ...overrides,
  };
}

function createClient(index, overrides) {
  return request(app)
    .post(`${API}/clients`)
    .send(clientPayload(index, overrides));
}

function createOrderPayload(client, products, overrides = {}) {
  return {
    clientId: client.id,
    status: 'open',
    orderedAt: '2026-03-01T09:00:00.000Z',
    discountType: 'percent',
    discountValue: 10,
    items: [
      { product_id: products[0].id, quantity: 2 },
      { productId: products[1].id, quantity: 1 },
    ],
    ...overrides,
  };
}

describe('API REST (v1)', () => {
  beforeEach(resetDatabase);

  afterAll(() => sequelize.close());

  it('expõe o índice e as listagens sem exigir autenticação', async () => {
    const index = await request(app).get(API);

    expect(index.status).toBe(200);
    expect(index.body.message).toContain('API');
    expect(index.body.endpoints).toEqual({
      clients: '/api/v1/clients',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
    });

    const clients = await request(app).get(`${API}/clients`);
    expect(clients.status).toBe(200);
    expect(clients.body.data).toEqual([]);
    expect(clients.body.meta.total).toBe(0);

    const unknown = await request(app).get(`${API}/nao-existe`);
    expect(unknown.status).toBe(404);
    expect(unknown.body.error).toBe('Recurso não encontrado.');
  });

  it('lista clientes com paginação, filtro e ordenação', async () => {
    await seedClients(3);

    const firstPage = await request(app).get(`${API}/clients?per_page=2`);
    expect(firstPage.status).toBe(200);
    expect(firstPage.body.data).toHaveLength(2);
    expect(firstPage.body.meta).toEqual({
      page: 1,
      perPage: 2,
      total: 3,
      lastPage: 2,
      from: 1,
      to: 2,
    });

    const secondPage = await request(app).get(
      `${API}/clients?per_page=2&page=2`,
    );
    expect(secondPage.body.data).toHaveLength(1);
    expect(secondPage.body.meta.from).toBe(3);
    expect(secondPage.body.meta.to).toBe(3);

    const alias = await request(app).get(`${API}/clients?perPage=1`);
    expect(alias.body.meta.perPage).toBe(1);
    expect(alias.body.data).toHaveLength(1);

    const filtered = await request(app).get(
      `${API}/clients?name=${encodeURIComponent('Cliente 02')}`,
    );
    expect(filtered.body.meta.total).toBe(1);
    expect(filtered.body.data[0].name).toBe('Cliente 02');

    const sorted = await request(app).get(
      `${API}/clients?sort=name&dir=desc&per_page=100`,
    );
    expect(sorted.body.data.map((client) => client.name)).toEqual([
      'Cliente 03',
      'Cliente 02',
      'Cliente 01',
    ]);
  });

  it('cria, consulta e valida clientes', async () => {
    const invalid = await request(app)
      .post(`${API}/clients`)
      .send({ name: 'ab', cpf: '123', email: 'invalido' });

    expect(invalid.status).toBe(422);
    expect(invalid.body.error).toBe('Dados inválidos.');
    expect(invalid.body.errors.map((error) => error.field)).toEqual(
      expect.arrayContaining(['name', 'cpf', 'email']),
    );

    const cpf = makeCpf(40);
    const formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9,
    )}-${cpf.slice(9)}`;

    const created = await createClient(40, {
      cpf: formattedCpf,
      email: 'NOVO.CLIENTE@TESTE.COM',
    });

    expect(created.status).toBe(201);
    expect(created.body.data.email).toBe('novo.cliente@teste.com');
    expect(created.body.data.cpf).toBe(cpf);
    expect(created.headers.location).toBe(
      `/api/v1/clients/${created.body.data.id}`,
    );

    const show = await request(app).get(created.headers.location);
    expect(show.status).toBe(200);
    expect(show.body.data.id).toBe(created.body.data.id);

    const duplicateCpf = await createClient(41, { cpf });
    expect(duplicateCpf.status).toBe(422);
    expect(duplicateCpf.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'cpf' }),
      ]),
    );

    const duplicateEmail = await createClient(41, {
      email: 'novo.cliente@teste.com'.toUpperCase(),
    });
    expect(duplicateEmail.status).toBe(422);
    expect(duplicateEmail.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email' }),
      ]),
    );

    expect(await Client.count()).toBe(1);
  });

  it('atualiza clientes com PATCH parcial e PUT completo', async () => {
    const [client] = await seedClients(1);

    const patched = await request(app)
      .patch(`${API}/clients/${client.id}`)
      .send({ name: 'Cliente Patch' });

    expect(patched.status).toBe(200);
    expect(patched.body.data.name).toBe('Cliente Patch');
    expect(patched.body.data.cpf).toBe(client.cpf);
    expect(patched.body.data.email).toBe(client.email);

    const invalidPatch = await request(app)
      .patch(`${API}/clients/${client.id}`)
      .send({ email: 'invalido' });
    expect(invalidPatch.status).toBe(422);

    const newCpf = makeCpf(55);
    const put = await request(app)
      .put(`${API}/clients/${client.id}`)
      .send({
        name: 'Cliente Completo',
        cpf: newCpf,
        email: 'completo@teste.com',
      });

    expect(put.status).toBe(200);
    expect(put.body.data.name).toBe('Cliente Completo');
    expect(put.body.data.cpf).toBe(newCpf);

    const missing = await request(app).get(`${API}/clients/999999`);
    expect(missing.status).toBe(404);

    const missingPatch = await request(app)
      .patch(`${API}/clients/999999`)
      .send({ name: 'Fantasma' });
    expect(missingPatch.status).toBe(404);
  });

  it('remove clientes e bloqueia vínculos com pedidos', async () => {
    const free = await createClient(60);
    const freeId = free.body.data.id;

    const removed = await request(app).delete(`${API}/clients/${freeId}`);
    expect(removed.status).toBe(200);
    expect(removed.body.data.id).toBe(freeId);

    const afterRemove = await request(app).get(`${API}/clients/${freeId}`);
    expect(afterRemove.status).toBe(404);

    const [client] = await seedClients(1);
    const [product] = await seedProducts(1);
    await seedOrder({ client, items: [{ product, quantity: 1 }] });

    const blocked = await request(app).delete(`${API}/clients/${client.id}`);
    expect(blocked.status).toBe(409);
    expect(blocked.body.error).toContain('pedidos vinculados');

    const bulkA = await createClient(61);
    const bulkB = await createClient(62);
    const bulk = await request(app)
      .delete(`${API}/clients/bulk`)
      .send({ ids: [bulkA.body.data.id, bulkB.body.data.id] });

    expect(bulk.status).toBe(200);
    expect(bulk.body.data).toEqual({ deleted: 2, skipped: 0 });

    const queryBulk = await createClient(63);
    const byQuery = await request(app).delete(
      `${API}/clients/bulk?ids=${queryBulk.body.data.id}`,
    );
    expect(byQuery.status).toBe(200);
    expect(byQuery.body.data.deleted).toBe(1);

    const empty = await request(app).delete(`${API}/clients/bulk`).send({});
    expect(empty.status).toBe(422);
  });

  it('lista produtos com ordenação e filtros numéricos', async () => {
    await seedProducts(3);

    const sorted = await request(app).get(
      `${API}/products?sort=price&dir=desc&per_page=100`,
    );
    expect(sorted.status).toBe(200);
    expect(sorted.body.data.map((product) => Number(product.price))).toEqual([
      300, 200, 100,
    ]);

    const filtered = await request(app).get(
      `${API}/products?min_price=150&max_price=250`,
    );
    expect(filtered.body.meta.total).toBe(1);
    expect(filtered.body.data[0].title).toBe('Produto 02');
  });

  it('cria, atualiza e remove produtos', async () => {
    const invalid = await request(app)
      .post(`${API}/products`)
      .send({ sku: '', title: 'a', price: -1, stock: -2 });

    expect(invalid.status).toBe(422);
    expect(invalid.body.errors.length).toBeGreaterThanOrEqual(3);

    const created = await request(app)
      .post(`${API}/products`)
      .send({ sku: 'api-produto', title: 'Produto API', price: 123.45, stock: 10 });

    expect(created.status).toBe(201);
    expect(created.body.data.sku).toBe('API-PRODUTO');
    expect(Number(created.body.data.price)).toBe(123.45);
    expect(created.headers.location).toBe(
      `/api/v1/products/${created.body.data.id}`,
    );

    const patched = await request(app)
      .patch(`${API}/products/${created.body.data.id}`)
      .send({ stock: 4 });

    expect(patched.status).toBe(200);
    expect(patched.body.data.stock).toBe(4);
    expect(Number(patched.body.data.price)).toBe(123.45);
    expect(patched.body.data.title).toBe('Produto API');

    const invalidPatch = await request(app)
      .patch(`${API}/products/${created.body.data.id}`)
      .send({ price: -5 });
    expect(invalidPatch.status).toBe(422);

    const removed = await request(app).delete(
      `${API}/products/${created.body.data.id}`,
    );
    expect(removed.status).toBe(200);

    const missing = await request(app).get(
      `${API}/products/${created.body.data.id}`,
    );
    expect(missing.status).toBe(404);
  });

  it('bloqueia exclusão de produtos usados e ignora bloqueados no bulk', async () => {
    const [client] = await seedClients(1);
    const [used, free] = await seedProducts(2);
    await seedOrder({ client, items: [{ product: used, quantity: 1 }] });

    const blocked = await request(app).delete(`${API}/products/${used.id}`);
    expect(blocked.status).toBe(409);
    expect(blocked.body.error).toContain('pedidos vinculados');

    const bulk = await request(app)
      .delete(`${API}/products/bulk`)
      .send({ ids: [used.id, free.id] });

    expect(bulk.status).toBe(200);
    expect(bulk.body.data).toEqual({ deleted: 1, skipped: 1 });
    expect(await Product.findByPk(used.id)).not.toBeNull();
    expect(await Product.findByPk(free.id)).toBeNull();
  });

  it('lista pedidos com itens, totais e filtros', async () => {
    const [firstClient, secondClient] = await seedClients(2);
    const [productA, productB, productC] = await seedProducts(3);

    await seedOrder({
      client: firstClient,
      items: [{ product: productA, quantity: 1 }],
      orderedAt: new Date('2026-01-10T10:00:00.000Z'),
    });
    await seedOrder({
      client: secondClient,
      status: 'paid',
      items: [{ product: productB, quantity: 1 }],
      orderedAt: new Date('2026-02-10T10:00:00.000Z'),
    });
    await seedOrder({
      client: firstClient,
      status: 'canceled',
      items: [{ product: productC, quantity: 2 }],
      orderedAt: new Date('2026-03-10T10:00:00.000Z'),
    });

    const list = await request(app).get(`${API}/orders?per_page=2`);
    expect(list.status).toBe(200);
    expect(list.body.data).toHaveLength(2);
    expect(list.body.meta.total).toBe(3);
    expect(list.body.data[0].items.length).toBeGreaterThan(0);
    expect(Number(list.body.data[0].total)).toBeGreaterThan(0);
    expect(list.body.data[0].client).toBeDefined();

    const sorted = await request(app).get(
      `${API}/orders?sort=total&dir=desc&per_page=100`,
    );
    const totals = sorted.body.data.map((order) => Number(order.total));
    expect(totals).toEqual([...totals].sort((a, b) => b - a));

    const byStatus = await request(app).get(`${API}/orders?status=paid`);
    expect(byStatus.body.meta.total).toBe(1);
    expect(byStatus.body.data[0].status).toBe('paid');

    const byClient = await request(app).get(
      `${API}/orders?client=${encodeURIComponent('Cliente 02')}`,
    );
    expect(byClient.body.meta.total).toBe(1);
    expect(byClient.body.data[0].client.name).toBe('Cliente 02');

    const byDate = await request(app).get(
      `${API}/orders?ordered_from=2026-02-01&ordered_to=2026-02-28`,
    );
    expect(byDate.body.meta.total).toBe(1);
    expect(byDate.body.data[0].status).toBe('paid');
  });

  it('valida pedidos com erros por campo', async () => {
    const [client] = await seedClients(1);
    const [product] = await seedProducts(1);

    const empty = await request(app).post(`${API}/orders`).send({});

    expect(empty.status).toBe(422);
    expect(empty.body.errors.map((error) => error.field)).toEqual(
      expect.arrayContaining(['client_id', 'status', 'ordered_at', 'items']),
    );

    const duplicate = await request(app)
      .post(`${API}/orders`)
      .send({
        client_id: client.id,
        status: 'open',
        ordered_at: '2026-03-01T09:00:00.000Z',
        items: [
          { productId: product.id, quantity: 1 },
          { productId: product.id, quantity: 2 },
        ],
      });

    expect(duplicate.status).toBe(422);
    expect(duplicate.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining('Não repita'),
        }),
      ]),
    );

    const invalidDiscount = await request(app)
      .post(`${API}/orders`)
      .send({
        client_id: client.id,
        status: 'open',
        ordered_at: '2026-03-01T09:00:00.000Z',
        discount_type: 'percent',
        discount_value: 150,
        items: [{ productId: product.id, quantity: 1 }],
      });

    expect(invalidDiscount.status).toBe(422);

    const missingProduct = await request(app)
      .post(`${API}/orders`)
      .send({
        client_id: client.id,
        status: 'open',
        ordered_at: '2026-03-01T09:00:00.000Z',
        items: [{ productId: 999999, quantity: 1 }],
      });

    expect(missingProduct.status).toBe(422);
    expect(await Order.count()).toBe(0);
  });

  it('cria pedido com camelCase, itens aninhados e preço congelado', async () => {
    const [client] = await seedClients(1);
    const [productA, productB] = await seedProducts(2);

    const created = await request(app)
      .post(`${API}/orders`)
      .send(createOrderPayload(client, [productA, productB]));

    expect(created.status).toBe(201);
    expect(created.headers.location).toBe(
      `/api/v1/orders/${created.body.data.id}`,
    );
    expect(created.body.data.clientId).toBe(client.id);
    expect(created.body.data.discountType).toBe('percent');
    expect(created.body.data.items).toHaveLength(2);
    expect(
      created.body.data.items.map((item) => Number(item.unitPrice)),
    ).toEqual([100, 200]);

    // 2 x 100 + 1 x 200 = 400; 10% = 40; total 360.
    expect(Number(created.body.data.subtotal)).toBe(400);
    expect(Number(created.body.data.discountAmount)).toBe(40);
    expect(Number(created.body.data.total)).toBe(360);

    await productA.update({ price: 999 });

    const show = await request(app).get(created.headers.location);
    expect(show.status).toBe(200);
    expect(show.body.data.client.id).toBe(client.id);
    expect(show.body.data.items[0].product.id).toBe(productA.id);
    expect(Number(show.body.data.items[0].unitPrice)).toBe(100);
    expect(Number(show.body.data.total)).toBe(360);
  });

  it('atualiza pedido com PATCH parcial e PUT completo', async () => {
    const [client] = await seedClients(1);
    const [productA, productB, productC] = await seedProducts(3);

    const created = await request(app)
      .post(`${API}/orders`)
      .send(createOrderPayload(client, [productA, productB]));
    const orderId = created.body.data.id;

    const patched = await request(app)
      .patch(`${API}/orders/${orderId}`)
      .send({ status: 'paid' });

    expect(patched.status).toBe(200);
    expect(patched.body.data.status).toBe('paid');
    expect(patched.body.data.clientId).toBe(client.id);
    expect(patched.body.data.discountType).toBe('percent');
    expect(patched.body.data.items).toHaveLength(2);
    expect(Number(patched.body.data.total)).toBe(360);

    const put = await request(app)
      .put(`${API}/orders/${orderId}`)
      .send({
        client_id: client.id,
        status: 'canceled',
        ordered_at: '2026-04-01T09:00:00.000Z',
        discount_type: 'fixed',
        discount_value: 50,
        items: [{ productId: productC.id, quantity: 3 }],
      });

    expect(put.status).toBe(200);
    expect(put.body.data.status).toBe('canceled');
    expect(put.body.data.items).toHaveLength(1);
    expect(Number(put.body.data.subtotal)).toBe(900);
    expect(Number(put.body.data.discountAmount)).toBe(50);
    expect(Number(put.body.data.total)).toBe(850);

    const missing = await request(app)
      .patch(`${API}/orders/999999`)
      .send({ status: 'paid' });
    expect(missing.status).toBe(404);
  });

  it('exclui pedidos em cascata e em massa', async () => {
    const [client] = await seedClients(1);
    const [productA, productB] = await seedProducts(2);

    const invalidBulk = await request(app)
      .delete(`${API}/orders/bulk`)
      .send({});
    expect(invalidBulk.status).toBe(422);

    const created = await request(app)
      .post(`${API}/orders`)
      .send(createOrderPayload(client, [productA, productB]));
    const orderId = created.body.data.id;

    const removed = await request(app).delete(`${API}/orders/${orderId}`);
    expect(removed.status).toBe(200);
    expect(removed.body.data.id).toBe(orderId);
    expect(await OrderItem.count({ where: { orderId } })).toBe(0);

    const afterRemove = await request(app).get(`${API}/orders/${orderId}`);
    expect(afterRemove.status).toBe(404);

    const bulkA = await request(app)
      .post(`${API}/orders`)
      .send(
        createOrderPayload(client, [productA, productB], {
          orderedAt: '2026-05-01T09:00:00.000Z',
        }),
      );
    const bulkB = await request(app)
      .post(`${API}/orders`)
      .send(
        createOrderPayload(client, [productA, productB], {
          orderedAt: '2026-05-02T09:00:00.000Z',
        }),
      );

    const bulk = await request(app)
      .delete(`${API}/orders/bulk`)
      .send({ ids: [bulkA.body.data.id, bulkB.body.data.id] });

    expect(bulk.status).toBe(200);
    expect(bulk.body.data).toEqual({ deleted: 2 });
    expect(await Order.count()).toBe(0);
  });
});
