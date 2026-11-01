'use strict';

const { faker } = require('@faker-js/faker');

const { roundMoney } = require('../../helpers/money');

function buildProduct(overrides = {}) {
  return {
    sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
    title: faker.commerce.productName().slice(0, 100),
    price: roundMoney(
      faker.number.float({ min: 5, max: 2000, fractionDigits: 2 }),
    ),
    stock: faker.number.int({ min: 0, max: 500 }),
    ...overrides,
  };
}

module.exports = { buildProduct };
