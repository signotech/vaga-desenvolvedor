/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('request_products', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      uuid_request: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'requests',
          key: 'uuid',
        },
      },
      uuid_products: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'uuid',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('request_products');
  },
};
