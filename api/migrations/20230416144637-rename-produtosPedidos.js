'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('produtos_pedidos', 'pedidos_produtos');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('pedidos_produtos', 'produtos_pedidos');
  }
};