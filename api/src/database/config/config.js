require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const suffix = {
  prod: '',
  production: '',
  dev: '_dev',
  development: '_dev',
  test: '_test',
};

const options = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: `${process.env.MYSQL_DB_NAME || 'database'}${suffix[environment]}`,
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || '3306',
  dialect: 'mysql',
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
