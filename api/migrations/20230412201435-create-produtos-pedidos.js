'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtosPedidos', { 
      sku_produto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'produtos',
          key: 'sku_produto'
        }
      },
      codigo_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'codigo_pedido'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
