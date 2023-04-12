'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', { 
      sku_produto: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false
      },
      titulo_produto: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};
