const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const defaultStorage = path.resolve(__dirname, '../../database/database.sqlite');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || defaultStorage,
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || defaultStorage,
    logging: false,
  },
};
