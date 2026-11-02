'use strict';

const { faker } = require('@faker-js/faker');

const { Client } = require('../../models');
const { buildClient } = require('../factories/clientFactory');

const TOTAL_CLIENTS = 30;

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up() {
    const count = await Client.count();

    if (count > 0) {
      console.log('Clientes já cadastrados, seed ignorado.');
      return;
    }

    faker.seed(20260101);

    const clients = [];
    const usedCpfs = new Set();
    const usedEmails = new Set();

    while (clients.length < TOTAL_CLIENTS) {
      const client = buildClient();

      if (usedCpfs.has(client.cpf) || usedEmails.has(client.email)) {
        continue;
      }

      usedCpfs.add(client.cpf);
      usedEmails.add(client.email);
      clients.push(client);
    }

    await Client.bulkCreate(clients, { validate: true });
    console.log(`${clients.length} clientes criados.`);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clients', null, {});
  },
};
