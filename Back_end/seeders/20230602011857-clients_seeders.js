const { faker } = require('@faker-js/faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {

      const clients = []

      for (let i = 0; i < 50; i++) {
         
         const name = faker.person.firstName();
         const lastName = faker.person.lastName()

         clients.push({
            name_client: `${name} ${lastName}`,
            cpf_client: `12345${i}`,
            email_client: `${name}${i}@mail.com`,
            createdAt: new Date(),
            updatedAt: new Date(),
         })

      }
      await queryInterface.bulkInsert("clients", clients, []);
   },


   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("clients", null, {});
   }
};
