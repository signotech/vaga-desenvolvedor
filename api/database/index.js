const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const cliente = require('../models/cliente');
const produto = require('../models/produto');

const connection = new Sequelize(dbConfig.development);

cliente.init(connection);
produto.init(connection);

module.exports = connection;