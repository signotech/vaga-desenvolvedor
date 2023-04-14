'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtosPedidos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_produto: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'produtos',
          key: 'id'
        }
      },
      codigo_pedido: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'codigo_pedido'
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtosPedidos');
  }
};
