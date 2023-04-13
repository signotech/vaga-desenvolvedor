'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtosPedidos', { 
      id_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        references: {
          model: 'produtos',
          key: 'id'
        }
      },
      codigo_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'codigo_pedido'
        }
      },
    }, { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtosPedidos');
  }
};
