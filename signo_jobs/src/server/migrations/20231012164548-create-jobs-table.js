"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("jobs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      salary: { type: Sequelize.STRING, allowNull: true },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["CLT", "PJ", "FREELANCER"]],
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["PAUSED", "JOB"]],
        },
      },
      candidates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("jobs");
  },
};
