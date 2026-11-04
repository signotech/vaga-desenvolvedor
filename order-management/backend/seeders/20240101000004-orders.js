'use strict';

const { orderBatch, orderItemsFactory } = require('../factories/orderFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [existingOrders] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM orders'
    );
    if (existingOrders[0].count > 0) {
      console.log('Orders seed already applied, skipping...');
      return;
    }

    const [clients] = await queryInterface.sequelize.query('SELECT id FROM clients');
    const [users] = await queryInterface.sequelize.query('SELECT id FROM users');
    const [products] = await queryInterface.sequelize.query('SELECT id, price FROM products');

    if (clients.length === 0 || users.length === 0 || products.length === 0) {
      throw new Error('Run clients, users and products seeds first');
    }

    const clientIds = clients.map((c) => c.id);
    const userIds = users.map((u) => u.id);

    const orders = orderBatch(80, clientIds, userIds);
    await queryInterface.bulkInsert('orders', orders);

    // Busca os IDs dos pedidos inseridos
    const [insertedOrders] = await queryInterface.sequelize.query('SELECT id FROM orders ORDER BY id');

    // Cria os itens de cada pedido
    const allItems = [];
    for (const order of insertedOrders) {
      const items = orderItemsFactory(order.id, products);
      allItems.push(...items);
    }

    await queryInterface.bulkInsert('order_items', allItems);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('order_items', null);
    await queryInterface.bulkDelete('orders', null);
  },
};
