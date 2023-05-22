'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    titulo_produto: DataTypes.STRING(100),
    sku_produto: DataTypes.STRING(100),
    preco: DataTypes.DECIMAL(10,2),
    estoque: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });

  product.belongsToMany('order', {
    through: 'join_orders_products',
    as: 'id_produto'
  })
  return product;
};