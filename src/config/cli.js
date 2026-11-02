const env = require('./env');

const base = {
  dialect: env.db.dialect,
  storage: env.db.dialect === 'sqlite' ? env.db.storage : undefined,
  logging: false,
};

module.exports = {
  development: base,
  test: {
    ...base,
    storage: ':memory:',
  },
  production: base,
};
