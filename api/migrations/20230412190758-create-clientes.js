'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cpf_cliente: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true
      },
      nome_cliente: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email_cliente: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};
