"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "User Test 1",
          email: "test1@test.com",
          password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic2VuaGFfdGVzdGUiLCJpYXQiOjE2OTcxMzE5MzksImV4cCI6Nzc0NDUyNzEzOX0.BxHNBgLv2bwV5-MuGRu4jnOba-vux8n7bz2sUYVXKuE",
          role: "ADMIN",
          jobs: ["1", "2", "5"],
        },
        {
          id: 2,
          name: "User Test 2",
          email: "test2@test.com",
          password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic2VuaGFfdGVzdGUiLCJpYXQiOjE2OTcxMzE5MzksImV4cCI6Nzc0NDUyNzEzOX0.BxHNBgLv2bwV5-MuGRu4jnOba-vux8n7bz2sUYVXKuE",
          role: "USER",
          jobs: ["3", "1"],
        },
        {
          id: 3,
          name: "User Test 3",
          email: "test3@live.com",
          password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic2VuaGFfdGVzdGUiLCJpYXQiOjE2OTcxMzE5MzksImV4cCI6Nzc0NDUyNzEzOX0.BxHNBgLv2bwV5-MuGRu4jnOba-vux8n7bz2sUYVXKuE",
          role: "USER",
        },
        {
          id: 4,
          name: "User Test 4",
          email: "test4@live.com",
          password:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic2VuaGFfdGVzdGUiLCJpYXQiOjE2OTcxMzE5MzksImV4cCI6Nzc0NDUyNzEzOX0.BxHNBgLv2bwV5-MuGRu4jnOba-vux8n7bz2sUYVXKuE",
          role: "ADMIN",
          jobs: ["3", "4"],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
