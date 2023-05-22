'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class join_orders_clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  join_orders_clients.init({
    id_cliente: DataTypes.INTEGER,
    id_pedido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'join_orders_clients',
  });
  return join_orders_clients;
};