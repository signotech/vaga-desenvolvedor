const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const cliente = require('../models/cliente');
const produto = require('../models/produto');
const pedido = require('../models/pedido');
const produtosPedido = require('../models/produtosPedido');

const connection = new Sequelize(dbConfig.development);

cliente.init(connection);
produto.init(connection);
pedido.init(connection);
produtosPedido.init(connection);

cliente.hasMany(pedido, { onDelete: 'CASCADE' });

pedido.hasMany(produtosPedido, { onDelete: 'CASCADE' });
pedido.belongsTo(cliente);

produtosPedido.belongsTo(pedido);
produtosPedido.belongsTo(produto);

module.exports = connection;