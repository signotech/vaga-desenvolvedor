
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING(150),
        allowNull: true
    },

    cpf: {
        type: DataTypes.CHAR(11),
        allowNull: true
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    }

}, {
    tableName: 'clientes',
    timestamps: true
});

module.exports = Cliente;
