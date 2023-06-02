
   'use strict';
   const { faker } = require('@faker-js/faker');

   /** @type {import('sequelize-cli').Migration} */
   module.exports = {
   async up (queryInterface, Sequelize) {

      const products = []

      for (let i = 1; i < 51; i++) {
         const randomSku =  faker.number.bigInt({min:1000000n, max: 2000000n }) 
         const randomStock = faker.number.bigInt({min:1n, max:100n}) 
         const randomName = faker.commerce.productName()
         const randomPrice = faker.commerce.price({ min: 50, max: 500 }) 

         products.push({
            title_product: randomName,
            sku_product: `SKU:${randomSku}-${randomName}`,
            price_product: randomPrice,
            stock_product: randomStock,
            product_order_id: i,
            updatedAt: new Date(),
            createdAt: new Date()
         })
      }

      await queryInterface.bulkInsert("products", products, []);
   },

   async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete("products", null, {});
   }
   };
