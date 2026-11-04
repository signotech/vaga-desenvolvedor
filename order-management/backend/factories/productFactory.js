'use strict';

const { faker } = require('@faker-js/faker/locale/pt_BR');

const CATEGORIES = ['ELETRÔNICO', 'ROUPAS', 'ALIMENTOS', 'MÓVEIS', 'FERRAMENTAS', 'ESPORTES', 'LIVROS', 'BRINQUEDOS'];

/**
 * Cria um objeto de produto fictício.
 */
function productFactory(overrides = {}) {
  const category = faker.helpers.arrayElement(CATEGORIES);
  const productName = faker.commerce.productName();

  return {
    sku: `SKU-${category.substring(0, 3)}-${faker.string.alphanumeric(6).toUpperCase()}`,
    title: `${productName} - ${category}`,
    price: parseFloat(faker.commerce.price({ min: 10, max: 5000, dec: 2 })),
    stock: faker.number.int({ min: 0, max: 500 }),
    deleted_at: null,
    created_at: faker.date.between({ from: '2023-01-01', to: new Date() }),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Cria uma lista de objetos de produtos fictícios.
 */
function productBatch(count = 30, overrides = {}) {
  const products = [];
  const usedSkus = new Set();

  while (products.length < count) {
    const product = productFactory(overrides);

    if (usedSkus.has(product.sku)) {
      continue;
    }

    usedSkus.add(product.sku);
    products.push(product);
  }

  return products;
}

module.exports = { productFactory, productBatch };
