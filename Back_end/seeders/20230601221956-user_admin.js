const { hashSync } = require("bcryptjs");

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async (queryInterface, Sequelize) => {
      
      const bcryptPassword = hashSync("123456", 10);

      await queryInterface.bulkInsert("admin_users", [
         {
            email_user: "users@admin.com",
            password_user: bcryptPassword,
            is_admin: true,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("admin_users", null, {});
   },
};
