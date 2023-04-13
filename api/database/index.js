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

module.exports = connection;