'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {
   await queryInterface.createTable("products", {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
      },
      title_product: {
         type: Sequelize.STRING(100),
         allowNull: false,
      },
      sku_product: {
         type: Sequelize.STRING(100),
         allowNull: false,
      },
      price_product: {
         type: Sequelize.DECIMAL(10, 2) ,
         allowNull: false,
   
      },
      stock_product:{
         type:Sequelize.INTEGER,
         allowNull: false
      },
      createdAt: {
         type: Sequelize.DATE,
         allowNull: false,
      },
      updatedAt: {
         type: Sequelize.DATE,
         allowNull: false,
      },
      product_order_id: {
         type: Sequelize.INTEGER,
         allowNull: true,
         unique: true,
         references: {
            model: 'product_orders', 
            key: 'id' 
         },
         onUpdate: 'CASCADE', 
         onDelete: 'SET NULL'
      }
   });
},

async down (queryInterface, Sequelize) {
   await queryInterface.dropTable("products");
}
};
