/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos_produtos', {
      codigoPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'pedidos',
          key: 'codigo_pedido',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'codigo_pedido',
      },
      skuProduto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'produtos',
          key: 'sku_produto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'sku_produto',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos_produtos');
  },
};
