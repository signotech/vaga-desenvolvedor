const { DataTypes } = require('sequelize');
const sequelize = require('../db');
//pra acessar a aplicação
const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255)
  },
  senha: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  confirmarsenha: {
    type: DataTypes.STRING(150),
    allowNull: false
  }

});

module.exports = Admin;