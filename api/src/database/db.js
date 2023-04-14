const Sequelize = require('sequelize');
const config = require('./config/config');

const customer = require('./models/customer');
const products = require('./models/product');
const requests = require('./models/requests');
const requestProducts = require('./models/requestProduct');

const connection = new Sequelize(config);

customer.init(connection);
products.init(connection);
requests.init(connection);
requestProducts.init(connection);

requestProducts.hasMany(products, {
  foreignKey: 'uuid',
});

module.exports = connection;
