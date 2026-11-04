'use strict';

const { faker } = require('@faker-js/faker/locale/pt_BR');

const STATUS_OPTIONS = ['OPEN', 'PAID', 'CANCELLED'];
// Distribuição: mais pedidos ABERTOS/PAGOS que CANCELADOS para gerar dados realistas
const STATUS_WEIGHTS = ['OPEN', 'OPEN', 'PAID', 'PAID', 'PAID', 'CANCELLED'];

/**
 * Cria um objeto de pedido fictício.
 */
function orderFactory(clientIds, userIds, overrides = {}) {
  if (!clientIds || clientIds.length === 0) throw new Error('clientIds required');
  if (!userIds || userIds.length === 0) throw new Error('userIds required');

  return {
    client_id: faker.helpers.arrayElement(clientIds),
    user_id: faker.helpers.arrayElement(userIds),
    order_date: faker.date.between({ from: '2023-01-01', to: new Date() }),
    status: faker.helpers.arrayElement(STATUS_WEIGHTS),
    discount_percent: faker.helpers.arrayElement([0, 0, 0, 5, 10, 15, 20]),
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Cria uma lista de objetos de pedidos fictícios.
 */
function orderBatch(count = 50, clientIds, userIds, overrides = {}) {
  return Array.from({ length: count }, () => orderFactory(clientIds, userIds, overrides));
}

/**
 * Cria os itens de um pedido a partir de uma lista de produtos.
 * Retorna de 1 a 5 itens por pedido com os preços históricos.
 */
function orderItemsFactory(orderId, products) {
  if (!products || products.length === 0) throw new Error('products required');

  const count = faker.number.int({ min: 1, max: Math.min(5, products.length) });
  const selectedProducts = faker.helpers.arrayElements(products, count);

  return selectedProducts.map((product) => ({
    order_id: orderId,
    product_id: product.id,
    quantity: faker.number.int({ min: 1, max: 10 }),
    unit_price: parseFloat(product.price), // Registro do preço histórico
    created_at: new Date(),
    updated_at: new Date(),
  }));
}

module.exports = { orderFactory, orderBatch, orderItemsFactory };
