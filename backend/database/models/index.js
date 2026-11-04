const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const models = Object.fromEntries(
  ['Cliente', 'Produto', 'Pedido', 'PedidoItem', 'Usuario'].map(nome => [nome, require(`./${nome}`)(sequelize, DataTypes)])
);

Object.values(models).forEach(model => model.associate?.(models));

module.exports = { ...models, sequelize };
