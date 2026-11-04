'use strict';

const { clientBatch } = require('../factories/clientFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [existing] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM clients'
    );
    if (existing[0].count > 0) {
      console.log('Clients seed already applied, skipping...');
      return;
    }

    const clients = clientBatch(60);
    await queryInterface.bulkInsert('clients', clients);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clients', null);
  },
};
