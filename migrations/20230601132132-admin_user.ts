"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("admin_user", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
         },
         email_user: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
         },
         password_user: {
            type: Sequelize.STRING(150),
            allowNull: false,
         },
         is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("admin_user")
   },
};
