const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const User = require('../models/cliente');

const connection = new Sequelize(dbConfig.development);

User.init(connection);

module.exports = connection;