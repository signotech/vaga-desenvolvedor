'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('produtosPedidos', 'quantidade', {
      type: Sequelize.INTEGER
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('produtosPedidos', 'quantidade');
  }
};
