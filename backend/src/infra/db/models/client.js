'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    nome: DataTypes.STRING(150),
    email: DataTypes.STRING(255),
    cpf: DataTypes.STRING(11)
  }, {
    sequelize,
    modelName: 'client',
  });

  client.belongsToMany(order, {
    through: 'join_orders_clients',
    as: 'id_cliente'
  })

  return client;
};