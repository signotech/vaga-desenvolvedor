require('dotenv').config({ quiet: true });
const path = require('path');

const config = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || path.resolve(__dirname, '../database/database.sqlite'),
  logging: false
};

module.exports = { development: config, test: config, production: config };
