const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Produto = sequelize.define('produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER
  },
  promocao: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = Produto;
