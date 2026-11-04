module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      sku: { type: Sequelize.STRING(100), unique: true },
      titulo: { type: Sequelize.STRING(100), allowNull: false },
      preco: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      estoque: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Produtos');
  }
};
