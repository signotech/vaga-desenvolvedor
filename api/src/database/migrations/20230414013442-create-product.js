/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      title_product: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      sku_product: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price_product: {
        type: Sequelize.DECIMAL(),
        allowNull: false,
      },
      stock_product: {
        type: Sequelize.INTEGER(),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
