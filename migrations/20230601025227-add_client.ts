"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("clients", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
         },
         name: {
            type: Sequelize.STRING(150),
            allowNull: false
         },
         cpf: {
            type: Sequelize.STRING(11),
            allowNull: false,
            unique: true
         },
         email: {
            type: Sequelize.STRING(11),
            allowNull: false,
            unique: true
         },
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("clients");
   },
};
