'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('produtos', [
        {
          sku_produto: 'B12345',
          titulo_produto: 'Camiseta branca',
          preco: 25.99,
          estoque: 50
        },
        {
          sku_produto: 'B23456',
          titulo_produto: 'Camiseta preta',
          preco: 29.99,
          estoque: 40
        },
        {
          sku_produto: 'B34567',
          titulo_produto: 'Camisa social branca',
          preco: 59.99,
          estoque: 30
        },
        {
          sku_produto: 'B45678',
          titulo_produto: 'Camisa social preta',
          preco: 69.99,
          estoque: 25
        },
        {
          sku_produto: 'B56789',
          titulo_produto: 'Calça jeans',
          preco: 79.99,
          estoque: 20
        },
        {
          sku_produto: 'B67890',
          titulo_produto: 'Calça social',
          preco: 99.99,
          estoque: 15
        },
        {
          sku_produto: 'B78901',
          titulo_produto: 'Blusa de lã',
          preco: 49.99,
          estoque: 35
        },
        {
          sku_produto: 'B89012',
          titulo_produto: 'Jaqueta de couro',
          preco: 149.99,
          estoque: 10
        },
        {
          sku_produto: 'B90123',
          titulo_produto: 'Tênis esportivo',
          preco: 89.99,
          estoque: 30
        },
        {
          sku_produto: 'B01234',
          titulo_produto: 'Sapato social',
          preco: 129.99,
          estoque: 20
        },
        {
          sku_produto: 'A12345',
          titulo_produto: 'Livro de romance',
          preco: 19.99,
          estoque: 50
        },
        {
          sku_produto: 'A23456',
          titulo_produto: 'Livro de ficção científica',
          preco: 24.99,
          estoque: 40
        },
        {
          sku_produto: 'A34567',
          titulo_produto: 'Livro de suspense',
          preco: 29.99,
          estoque: 30
        },
        {
          sku_produto: 'A45678',
          titulo_produto: 'Livro de aventura',
          preco: 34.99,
          estoque: 25
        },
        {
          sku_produto: 'A56789',
          titulo_produto: 'Revista de moda',
          preco: 9.99,
          estoque: 50
        },
        {
          sku_produto: 'A67890',
          titulo_produto: 'Revista de decoração',
          preco: 7.99,
          estoque: 40
        },
        {
          sku_produto: 'A78901',
          titulo_produto: 'Revista de tecnologia',
          preco: 12.99,
          estoque: 30
        },
        {
          sku_produto: 'A89012',
          titulo_produto: 'Revista de esportes',
          preco: 8.99,
          estoque: 20
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('produtos', null, {});
  }
};
