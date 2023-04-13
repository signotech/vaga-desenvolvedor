'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      sku_produto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
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
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};
