'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('pedidos', [
        {
            id_cliente_pedido: 1,
            valor_pedido: 81.97,
            data_pedido: new Date()
        },
        {
            id_cliente_pedido: 2,
            valor_pedido: 179.97,
            data_pedido: new Date()
        },
        {
            id_cliente_pedido: 3,
            valor_pedido: 139.98,
            data_pedido: new Date()
        },
        {
            id_cliente_pedido: 4,
            valor_pedido: 319.96,
            data_pedido: new Date()
        },
        {
            id_cliente_pedido: 5,
            valor_pedido: 99.99,
            data_pedido: new Date()
        },
        {
            id_cliente_pedido: 6,
            valor_pedido: 249.95,
            data_pedido: new Date()
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('pedidos', null, {});
  }
};
