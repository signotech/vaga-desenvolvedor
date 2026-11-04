'use strict';

const { productBatch } = require('../factories/productFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [existing] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM products'
    );
    if (existing[0].count > 0) {
      console.log('Products seed already applied, skipping...');
      return;
    }

    const products = productBatch(40);
    await queryInterface.bulkInsert('products', products);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null);
  },
};
