/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      skuProduto: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        field: 'sku_produto',
      },
      tituloProduto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'titulo_produto',
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
      },
      estoque: {
        type: Sequelize.INTEGER,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  },
};
