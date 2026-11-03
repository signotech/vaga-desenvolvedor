
require('dotenv').config();

const { Sequelize } = require('sequelize');
const path = require('path');

// Caminho onde o banco de dados será armazenado
const databasePath = path.resolve(
    process.cwd(),
    process.env.DB_STORAGE || 'database/banco.sqlite'
);

// Configuração da conexão com o SQLite
const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: databasePath,
    logging: false
});

module.exports = sequelize;
