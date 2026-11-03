'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      sku: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      titulo: { type: Sequelize.STRING(100), allowNull: false },
      preco: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      estoque: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('produtos');
  },
};
