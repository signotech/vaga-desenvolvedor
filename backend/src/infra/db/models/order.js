'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    data_pedido: DataTypes.DATE(10,2),
    valor_pedido: DataTypes.DECIMAL,
    quantidade: DataTypes.INTEGER,
    id_cliente: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });

  order.belongsToMany('product', {
    through: 'join_orders_products',
    as: 'id_pedido'
  })

  order.belongsToMany('client', {
    through: 'join_orders_clients',
    as: 'id_pedido'
  })

  return order;
};