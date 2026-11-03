
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    sku: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },

    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    estoque: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'produtos',
    timestamps: true
});

module.exports = Produto;
