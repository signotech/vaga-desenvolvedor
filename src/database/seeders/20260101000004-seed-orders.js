'use strict';

const { faker } = require('@faker-js/faker');

const {
  sequelize,
  Client,
  Product,
  Order,
  OrderItem,
} = require('../../models');
const { buildOrderItem } = require('../factories/orderFactory');
const { roundMoney } = require('../../helpers/money');

const TOTAL_ORDERS = 80;
const STATUS_POOL = [
  'open',
  'open',
  'open',
  'open',
  'paid',
  'paid',
  'paid',
  'paid',
  'canceled',
  'canceled',
];

function oneYearAgo() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  return date;
}

function buildDiscount(subtotal) {
  if (!faker.datatype.boolean({ probability: 0.25 })) {
    return { discountType: 'none', discountValue: 0 };
  }

  if (faker.datatype.boolean({ probability: 0.5 })) {
    return {
      discountType: 'percent',
      discountValue: faker.number.int({ min: 5, max: 20 }),
    };
  }

  return {
    discountType: 'fixed',
    discountValue: roundMoney(
      Math.min(
        faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
        subtotal,
      ),
    ),
  };
}

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up() {
    const count = await Order.count();

    if (count > 0) {
      console.log('Pedidos já cadastrados, seed ignorado.');
      return;
    }

    const clients = await Client.findAll();
    const products = await Product.findAll();

    if (clients.length === 0 || products.length === 0) {
      console.log('É necessário ter clientes e produtos para criar pedidos.');
      return;
    }

    faker.seed(20260103);

    const maxItems = Math.min(4, products.length);

    await sequelize.transaction(async (transaction) => {
      for (let index = 0; index < TOTAL_ORDERS; index += 1) {
        const client = faker.helpers.arrayElement(clients);
        const selectedProducts = faker.helpers.arrayElements(
          products,
          faker.number.int({ min: 1, max: maxItems }),
        );

        const items = selectedProducts.map((product) =>
          buildOrderItem(product, faker.number.int({ min: 1, max: 5 })),
        );

        const subtotal = roundMoney(
          items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0,
          ),
        );

        const { discountType, discountValue } = buildDiscount(subtotal);

        const order = await Order.create(
          {
            clientId: client.id,
            status: faker.helpers.arrayElement(STATUS_POOL),
            orderedAt: faker.date.between({
              from: oneYearAgo(),
              to: new Date(),
            }),
            discountType,
            discountValue,
          },
          { transaction },
        );

        await OrderItem.bulkCreate(
          items.map((item) => ({ ...item, orderId: order.id })),
          { transaction, validate: true },
        );
      }
    });

    console.log(`${TOTAL_ORDERS} pedidos criados com seus itens.`);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
  },
};
