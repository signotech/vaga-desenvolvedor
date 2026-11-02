const { Sequelize } = require('sequelize');

const env = require('./env');

const sequelize = new Sequelize({
  dialect: env.db.dialect,
  storage: env.db.dialect === 'sqlite' ? env.db.storage : undefined,
  logging: env.db.logging ? console.log : false,
  // Em memória, uma única conexão mantém o banco vivo entre as queries.
  ...(env.db.storage === ':memory:' ? { pool: { max: 1 } } : {}),
});

module.exports = sequelize;
