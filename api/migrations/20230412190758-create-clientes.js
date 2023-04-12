'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', { 
      cpf_cliente: {
        type: Sequelize.CHAR(11),
        primaryKey: true,
        allowNull: false
      },
      nome_cliente: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email_cliente: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
