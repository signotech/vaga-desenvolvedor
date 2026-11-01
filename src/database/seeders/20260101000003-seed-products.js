'use strict';

const { faker } = require('@faker-js/faker');

const { Product } = require('../../models');
const { buildProduct } = require('../factories/productFactory');

const TOTAL_PRODUCTS = 40;

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up() {
    const count = await Product.count();

    if (count > 0) {
      console.log('Produtos já cadastrados, seed ignorado.');
      return;
    }

    faker.seed(20260102);

    const products = [];
    const usedSkus = new Set();

    while (products.length < TOTAL_PRODUCTS) {
      const product = buildProduct();

      if (usedSkus.has(product.sku)) {
        continue;
      }

      usedSkus.add(product.sku);
      products.push(product);
    }

    await Product.bulkCreate(products, { validate: true });
    console.log(`${products.length} produtos criados.`);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
