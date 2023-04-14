const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
      uuid: uuidv4(),
      title_product: 'Pc gamer',
      sku_product: 'Unidade',
      price_product: 1000,
      stock_product: 5,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
