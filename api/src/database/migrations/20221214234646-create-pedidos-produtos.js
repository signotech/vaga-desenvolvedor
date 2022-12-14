'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos_produtos', {
      codigoPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'pedidos',
          key: 'codigo_pedido'
        },
        field: 'codigo_pedido',
      },
      skuProduto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'produtos',
          key: 'sku_produto'
        },
        field: 'sku_produto',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos_produtos');
  }
};
