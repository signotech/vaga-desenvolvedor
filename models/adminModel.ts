const Sequelize = require("sequelize");
const database = require("../config/config");

const Admin = database.define("admin_user", {
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