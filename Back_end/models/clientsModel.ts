const Sequelize = require("sequelize");
import sequelize from "../src/data_source";

const Client = sequelize.define("client", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   name_client: {
      type: Sequelize.STRING(150),
      allowNull: false,
   },
   cpf_client: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
   },
   email_client: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
   },
   createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
   },
   updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
   },
});

export default Client;
