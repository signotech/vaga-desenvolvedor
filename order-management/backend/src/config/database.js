require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const config = {
  development: {
    username: process.env.DB_USER || 'orderflow',
    password: process.env.DB_PASS || 'orderflow_secret',
    database: process.env.DB_NAME || 'order_management',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      decimalNumbers: true,
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.LOG_LEVEL === 'debug' ? console.log : false,
  },

  test: {
    username: process.env.DB_USER || 'orderflow',
    password: process.env.DB_PASS || 'orderflow_secret',
    database: process.env.DB_NAME_TEST || 'order_management_test',
    host: process.env.DB_HOST_TEST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT_TEST) || 3307,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      decimalNumbers: true,
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false,
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      decimalNumbers: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    pool: {
      max: 20,
      min: 2,
      acquire: 60000,
      idle: 10000,
    },
    logging: false,
  },
};

module.exports = config;
