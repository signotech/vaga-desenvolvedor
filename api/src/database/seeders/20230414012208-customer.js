const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customers', [{
      uuid: uuidv4(),
      name: 'Willian Henkel',
      email: 'mail@example.com',
      user_cpf: '124.400.389-11',
    }], {});
  },

  async down(queryInterface, Sequelize) {

  },
};
