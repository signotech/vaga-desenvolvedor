'use strict';

const {
  sequelize,
  Order,
  OrderItem,
  resetDatabase,
  seedClients,
  seedProducts,
  seedOrder,
  authenticatedAgent,
} = require('./helpers');

function moneyText(html) {
  return String(html).replace(/\u00a0/g, ' ');
}

describe('Pedidos (web)', () => {
  let agent;
  let clients;
  let products;

  beforeEach(async () => {
    await resetDatabase();
    agent = await authenticatedAgent();
    clients = await seedClients(3);
    // Produtos com preços 100, 200 e 300.
    products = await seedProducts(3);
  });

  afterAll(() => sequelize.close());

  async function createThreeOrders() {
    return {
      first: await seedOrder({
        client: clients[0],
        items: [{ product: products[0], quantity: 2 }],
        orderedAt: new Date('2026-01-05T10:00:00.000Z'),
      }),
      second: await seedOrder({
        client: clients[1],
        status: 'paid',
        items: [
          { product: products[0], quantity: 1 },
          { product: products[1], quantity: 1 },
        ],
        orderedAt: new Date('2026-02-05T10:00:00.000Z'),
      }),
      third: await seedOrder({
        client: clients[2],
        status: 'canceled',
        items: [{ product: products[2], quantity: 2 }],
        orderedAt: new Date('2026-03-05T10:00:00.000Z'),
      }),
    };
  }

  /**
   * O serializer de formulário do supertest não suporta arrays de objetos,
   * então os itens são enviados com a notação de colchetes do body-parser.
   */
  function itemsToForm(items) {
    return items.reduce((body, item, index) => {
      body[`items[${index}][productId]`] = String(item.productId);
      body[`items[${index}][quantity]`] = String(item.quantity);

      return body;
    }, {});
  }

  function orderForm({ items = [], ...fields }) {
    return {
      ...fields,
      ...itemsToForm(items),
    };
  }

  function submitOrder(payload = {}) {
    const { items = [], ...fields } = payload;

    return agent
      .post('/orders')
      .type('form')
      .send({
        client_id: clients[0].id,
        status: 'open',
        ordered_at: '2026-01-15T10:00',
        discount_type: 'none',
        discount_value: 0,
        ...orderForm({ ...fields, items }),
      });
  }

  async function findByPkWithItems(id) {
    return Order.findByPk(id, {
      include: [{ model: OrderItem, as: 'items' }],
      order: [[{ model: OrderItem, as: 'items' }, 'id', 'ASC']],
    });
  }

  it('lista com paginação, filtros e ordenação por total', async () => {
    await createThreeOrders();

    const list = await agent.get('/orders');
    expect(list.status).toBe(200);
    expect(list.text).toContain('Mostrando 1–3 de 3');
    expect(list.text).toContain('Cliente 01');
    expect(list.text).toContain('Cliente 03');

    const pageTwo = await agent.get('/orders?per_page=2&page=2');
    expect(pageTwo.text).toContain('Mostrando 3–3 de 3');

    const byStatus = await agent.get('/orders?status=paid');
    expect(byStatus.text).toContain('Cliente 02');
    expect(byStatus.text).not.toContain('Cliente 03');

    const byClient = await agent.get(
      `/orders?client=${encodeURIComponent('Cliente 03')}`,
    );
    expect(byClient.text).toContain('Cliente 03');
    expect(byClient.text).not.toContain('Cliente 01');

    const byDate = await agent.get(
      '/orders?ordered_from=2026-02-01&ordered_to=2026-02-28',
    );
    expect(byDate.text).toContain('Cliente 02');
    expect(byDate.text).not.toContain('Cliente 01');
    expect(byDate.text).not.toContain('Cliente 03');

    const ascending = await agent.get('/orders?sort=total&dir=asc');
    expect(ascending.text.indexOf('Cliente 01')).toBeLessThan(
      ascending.text.indexOf('Cliente 02'),
    );
    expect(ascending.text.indexOf('Cliente 02')).toBeLessThan(
      ascending.text.indexOf('Cliente 03'),
    );

    const descending = await agent.get('/orders?sort=total&dir=desc');
    expect(descending.text.indexOf('Cliente 03')).toBeLessThan(
      descending.text.indexOf('Cliente 01'),
    );
  });

  it('exibe mensagem quando o filtro não retorna resultados', async () => {
    await createThreeOrders();

    const response = await agent.get(
      `/orders?client=${encodeURIComponent('Inexistente')}`,
    );

    expect(response.status).toBe(200);
    expect(response.text).toContain('Nenhum pedido encontrado');
  });

  it('cria pedido com desconto percentual e preço congelado', async () => {
    const response = await submitOrder({
      discount_type: 'percent',
      discount_value: 10,
      items: [
        { productId: products[0].id, quantity: 2 },
        { productId: products[1].id, quantity: 1 },
      ],
    });

    expect(response.status).toBe(302);
    expect(response.headers.location).toMatch(/^\/orders\/\d+$/);

    const id = Number(response.headers.location.split('/').pop());
    const order = await findByPkWithItems(id);

    // 2 x 100 + 1 x 200 = 400; 10% = 40; total 360.
    expect(Number(order.subtotal)).toBe(400);
    expect(Number(order.discountAmount)).toBe(40);
    expect(Number(order.total)).toBe(360);
    expect(order.items).toHaveLength(2);
    expect(order.items.map((item) => Number(item.unitPrice))).toEqual([
      100, 200,
    ]);

    // Alterar o preço do produto não pode alterar o pedido já criado.
    await products[0].update({ price: 999 });
    const reloaded = await findByPkWithItems(id);
    expect(Number(reloaded.items[0].unitPrice)).toBe(100);

    const show = await agent.get(response.headers.location);
    expect(show.status).toBe(200);
    expect(moneyText(show.text)).toContain('R$ 400,00');
    expect(moneyText(show.text)).toContain('R$ 360,00');
  });

  it('valida pedido com itens ausentes, duplicados e desconto inválido', async () => {
    const before = await Order.count();

    const emptyItems = await submitOrder({ items: [] });
    expect(emptyItems.status).toBe(422);
    expect(emptyItems.text).toContain('Adicione ao menos um produto ao pedido');

    const duplicateItems = await submitOrder({
      items: [
        { productId: products[0].id, quantity: 1 },
        { productId: products[0].id, quantity: 2 },
      ],
    });
    expect(duplicateItems.status).toBe(422);
    expect(duplicateItems.text).toContain('Não repita o mesmo produto');

    const invalidDiscount = await submitOrder({
      discount_type: 'percent',
      discount_value: 150,
      items: [{ productId: products[0].id, quantity: 1 }],
    });
    expect(invalidDiscount.status).toBe(422);
    expect(invalidDiscount.text).toContain(
      'O desconto percentual deve ser no máximo 100%',
    );

    const invalidClient = await submitOrder({
      client_id: 999999,
      items: [{ productId: products[0].id, quantity: 1 }],
    });
    expect(invalidClient.status).toBe(422);
    expect(invalidClient.text).toContain('Selecione um cliente válido');

    expect(await Order.count()).toBe(before);
  });

  it('edita pedido substituindo os itens e recalculando os totais', async () => {
    const order = await seedOrder({
      client: clients[0],
      items: [{ product: products[0], quantity: 1 }],
      discountType: 'percent',
      discountValue: 10,
    });

    const form = await agent.get(`/orders/${order.id}/edit`);
    expect(form.status).toBe(200);
    expect(form.text).toContain('Editar pedido');
    expect(form.text).toContain(`value="${order.id}"`);

    const response = await agent
      .put(`/orders/${order.id}`)
      .type('form')
      .send(
        orderForm({
          client_id: String(clients[1].id),
          status: 'paid',
          ordered_at: '2026-02-20T14:30',
          discount_type: 'fixed',
          discount_value: '50',
          items: [{ productId: products[2].id, quantity: 3 }],
        }),
      );

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/orders');

    const updated = await findByPkWithItems(order.id);
    expect(updated.clientId).toBe(clients[1].id);
    expect(updated.status).toBe('paid');
    expect(updated.discountType).toBe('fixed');

    // 3 x 300 = 900; desconto fixo de 50; total 850.
    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].productId).toBe(products[2].id);
    expect(updated.items[0].quantity).toBe(3);
    expect(Number(updated.subtotal)).toBe(900);
    expect(Number(updated.discountAmount)).toBe(50);
    expect(Number(updated.total)).toBe(850);

    const show = await agent.get(`/orders/${order.id}`);
    expect(moneyText(show.text)).toContain('R$ 900,00');
    expect(moneyText(show.text)).toContain('R$ 850,00');
  });

  it('limita o desconto fixo ao subtotal, sem total negativo', async () => {
    const response = await submitOrder({
      discount_type: 'fixed',
      discount_value: 5000,
      items: [{ productId: products[0].id, quantity: 1 }],
    });

    expect(response.status).toBe(302);

    const id = Number(response.headers.location.split('/').pop());
    const order = await findByPkWithItems(id);

    expect(Number(order.subtotal)).toBe(100);
    expect(Number(order.discountAmount)).toBe(100);
    expect(Number(order.total)).toBe(0);
  });

  it('exclui pedido e seus itens em cascata', async () => {
    const order = await seedOrder({
      client: clients[0],
      items: [
        { product: products[0], quantity: 1 },
        { product: products[1], quantity: 2 },
      ],
    });

    const response = await agent.delete(`/orders/${order.id}`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/orders');
    expect(await Order.findByPk(order.id)).toBeNull();
    expect(await OrderItem.count({ where: { orderId: order.id } })).toBe(0);

    const list = await agent.get('/orders');
    expect(list.text).toContain('Pedido excluído com sucesso');
  });

  it('exclui pedidos em massa', async () => {
    const { first, second } = await createThreeOrders();

    const response = await agent
      .post('/orders/bulk-delete')
      .type('form')
      .send({ ids: [first.id, second.id] });

    expect(response.status).toBe(302);
    expect(await Order.count()).toBe(1);
    expect(await Order.findByPk(first.id)).toBeNull();
    expect(await Order.findByPk(second.id)).toBeNull();

    const list = await agent.get('/orders');
    expect(list.text).toContain('2 pedido(s) excluído(s) com sucesso');
  });

  it('avisa quando nenhum pedido é selecionado para exclusão em massa', async () => {
    const response = await agent.post('/orders/bulk-delete').type('form').send({});

    expect(response.status).toBe(302);

    const list = await agent.get('/orders');
    expect(list.text).toContain('Selecione ao menos um pedido para excluir');
  });

  it('retorna 404 para pedido inexistente', async () => {
    const show = await agent.get('/orders/999999');
    const edit = await agent.get('/orders/999999/edit');

    expect(show.status).toBe(404);
    expect(edit.status).toBe(404);

    const update = await agent
      .put('/orders/999999')
      .type('form')
      .send(
        orderForm({
          client_id: String(clients[0].id),
          status: 'open',
          ordered_at: '2026-01-15T10:00',
          items: [{ productId: products[0].id, quantity: 1 }],
        }),
      );
    expect(update.status).toBe(404);

    const destroy = await agent.delete('/orders/999999');
    expect(destroy.status).toBe(302);

    const list = await agent.get('/orders');
    expect(list.text).toContain('Pedido não encontrado');
  });
});
