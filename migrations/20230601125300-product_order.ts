"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("product_order", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
         },
         request_code: {
            type: Sequelize.INTEGER,
         },
         request_date: {
            type: Sequelize.DATE,
         },
         request_status: {
            type: Sequelize.STRING(20),
            defaultValue: "Em Aberto",
         },
         createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         client_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "clients",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("product_order");
   },
};
