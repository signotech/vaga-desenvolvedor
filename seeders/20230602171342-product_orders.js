'use strict';
   const { faker } = require('@faker-js/faker');

   /** @type {import('sequelize-cli').Migration} */
   module.exports = {
   async up (queryInterface, Sequelize) {

      const orders = []
      const status = ["Em Aberto","Pago ","Cancelado"]
      
      for (let i = 1; i < 51; i++) {
         const randomNumber =  faker.number.bigInt({min:1000000n, max: 2000000n }) 
         const randomDate = faker.number.bigInt({min:1n, max:12n}) 
         const randomIndex = faker.number.bigInt({min:0n, max: 2n}) 

         orders.push({
            request_code: randomNumber,
            request_date: `2023-${randomDate}-${randomDate}`,
            request_status: status[randomIndex],
            client_id: i,
            updatedAt: new Date(),
            createdAt: new Date(),
         })
      }
      
      await queryInterface.bulkInsert("product_orders", orders, []);
   },

   async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete("product_orders", null, {});
   }
   };
