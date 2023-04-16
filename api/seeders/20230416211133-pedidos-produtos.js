'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('pedidos_produtos', [
        {
            id_produto: 1,
            codigo_pedido: 1,
            quantidade: 2
        },
        {
            id_produto: 2,
            codigo_pedido: 1,
            quantidade: 1
        },
        {
            id_produto: 3,
            codigo_pedido: 2,
            quantidade: 3
        },
        {
            id_produto: 4,
            codigo_pedido: 3,
            quantidade: 2
        },
        {
            id_produto: 5,
            codigo_pedido: 4,
            quantidade: 4
        },
        {
            id_produto: 6,
            codigo_pedido: 5,
            quantidade: 1
        }
    ] , {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
