"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("clients", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
         },
         name_client: {
            type: Sequelize.STRING(150),
            allowNull: false
         },
         cpf_client: {
            type: Sequelize.STRING(11),
            allowNull: false,
            unique: true
         },
         email_client: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
         }
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("clients");
   },
};
