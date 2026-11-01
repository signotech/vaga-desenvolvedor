const path = require('path');

require('dotenv').config({ quiet: true });

const rootDir = path.resolve(__dirname, '..', '..');

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  appName: process.env.APP_NAME || 'Pedidos de Compra',
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  db: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: path.resolve(rootDir, process.env.DB_STORAGE || 'src/database/database.sqlite'),
    logging: process.env.DB_LOGGING === 'true',
  },
};

module.exports = env;
