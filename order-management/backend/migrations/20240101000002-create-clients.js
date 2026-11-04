'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('clients', ['cpf'], {
      name: 'clients_cpf_unique',
      unique: true,
    });

    await queryInterface.addIndex('clients', ['email'], {
      name: 'clients_email_unique',
      unique: true,
    });

    await queryInterface.addIndex('clients', ['name'], { name: 'clients_name_idx' });
    await queryInterface.addIndex('clients', ['deleted_at'], { name: 'clients_deleted_at_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clients');
  },
};
