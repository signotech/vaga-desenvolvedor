'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', { 
      id_cliente_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      codigo_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      valor_pedido: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      data_pedido: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status_pedido: {
        type: Sequelize.STRING(9),
        allowNull: false,
        defaultValue: 'Aberto'
      }
    }, { timestamps: false});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos');
  }
};
