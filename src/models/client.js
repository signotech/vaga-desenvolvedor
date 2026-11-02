'use strict';

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 150],
      },
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{11}$/,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    underscored: true,
  },
);

module.exports = Client;
