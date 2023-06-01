const Sequelize = require("sequelize");
const database = require("../config/config");

const ProductOrder = database.define("product_order", {
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

export default ProductOrder