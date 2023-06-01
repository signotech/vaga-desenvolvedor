
const Sequelize = require("sequelize");
const database = require("../config/config");

const Products = database.define("products", {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   title_product: {
      type: Sequelize.STRING(100),
      allowNull: false
   },
   sku_product: {
      type: Sequelize.STRING(100),
      allowNull: false,
   },
   price_product: {
      type: Sequelize.DECIMAL(10, 2) ,
      allowNull: false,
      unique: true
   },
   stock_product:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   product_order_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      references: {
         model: 'product_order', 
         key: 'id' 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL'
   }
});

export default Products