'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      status: {
        type: Sequelize.ENUM('open', 'paid', 'canceled'),
        allowNull: false,
        defaultValue: 'open',
      },
      ordered_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      discount_type: {
        type: Sequelize.ENUM('none', 'fixed', 'percent'),
        allowNull: false,
        defaultValue: 'none',
      },
      discount_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('orders', ['client_id'], {
      name: 'orders_client_id_index',
    });
    await queryInterface.addIndex('orders', ['status'], {
      name: 'orders_status_index',
    });
    await queryInterface.addIndex('orders', ['ordered_at'], {
      name: 'orders_ordered_at_index',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  },
};
