const Sequelize = require("sequelize");
import sequelize from "../src/data_source";

const Admin = sequelize.define("admin_users", {
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
   createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
   },
   updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
   },
});

export default Admin