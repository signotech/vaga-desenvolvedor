'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('produtosPedidos', 'produtos_pedidos');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('produtos_pedidos', 'produtosPedidos');
  }
};
