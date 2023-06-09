const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cliente = sequelize.define('cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255)
  }
});

module.exports = Cliente;
