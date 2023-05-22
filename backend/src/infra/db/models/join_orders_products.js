'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class join_orders_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  join_orders_products.init({
    id_produto: DataTypes.INTEGER,
    id_pedido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'join_orders_products',
  });
  return join_orders_products;
};