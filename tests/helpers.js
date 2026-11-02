'use strict';

const request = require('supertest');

const app = require('../src/app');
const {
  sequelize,
  User,
  Client,
  Product,
  Order,
  OrderItem,
} = require('../src/models');
const { buildUser } = require('../src/database/factories/userFactory');
const { roundMoney } = require('../src/helpers/money');

const ADMIN = Object.freeze({
  email: 'admin@teste.com',
  password: 'admin123',
});

/**
 * Gera um CPF válido e determinístico a partir de um índice, para que os
 * testes não dependam de aleatoriedade.
 */
function makeCpf(index) {
  const digits = String(100000000 + index)
    .split('')
    .map(Number);

  for (let position = 0; position < 2; position += 1) {
    const length = 9 + position;
    let sum = 0;

    for (let i = 0; i < length; i += 1) {
      sum += digits[i] * (length + 1 - i);
    }

    const remainder = sum % 11;
    digits.push(remainder < 2 ? 0 : 11 - remainder);
  }

  return digits.join('');
}

async function resetDatabase() {
  await sequelize.sync({ force: true });

  return User.create(buildUser());
}

async function seedClients(count = 1) {
  const clients = [];

  for (let index = 0; index < count; index += 1) {
    const number = index + 1;

    clients.push(
      await Client.create({
        name: `Cliente ${String(number).padStart(2, '0')}`,
        cpf: makeCpf(index),
        email: `cliente${number}@teste.com`,
      }),
    );
  }

  return clients;
}

async function seedProducts(count = 3) {
  const rows = Array.from({ length: count }, (_, index) => ({
    sku: `SKU-${String(index + 1).padStart(3, '0')}`,
    title: `Produto ${String(index + 1).padStart(2, '0')}`,
    price: (index + 1) * 100,
    stock: 10 + index,
  }));

  return Product.bulkCreate(rows);
}

async function seedOrder({
  client,
  items,
  status = 'open',
  discountType = 'none',
  discountValue = 0,
  orderedAt = new Date('2026-01-10T10:00:00.000Z'),
}) {
  const order = await Order.create({
    clientId: client.id,
    status,
    orderedAt,
    discountType,
    discountValue,
  });

  await OrderItem.bulkCreate(
    items.map(({ product, quantity }) => ({
      orderId: order.id,
      productId: product.id,
      quantity,
      unitPrice: roundMoney(product.price),
    })),
  );

  return order;
}

function login(agent, credentials = ADMIN) {
  return agent.post('/login').type('form').send(credentials);
}

async function authenticatedAgent(credentials = ADMIN) {
  const agent = request.agent(app);
  const response = await login(agent, credentials);

  if (response.status !== 302) {
    throw new Error('Não foi possível autenticar o agente de testes.');
  }

  return agent;
}

function extractOrderIds(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="\/orders\/(\d+)"/g)].map((match) =>
        Number(match[1]),
      ),
    ),
  ];
}

module.exports = {
  app,
  request,
  sequelize,
  User,
  Client,
  Product,
  Order,
  OrderItem,
  ADMIN,
  makeCpf,
  resetDatabase,
  seedClients,
  seedProducts,
  seedOrder,
  login,
  authenticatedAgent,
  extractOrderIds,
};
