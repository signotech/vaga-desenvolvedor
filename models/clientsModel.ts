const Sequelize = require('sequelize')
const database = require('../db')

const Client = database.define('client', {
   id:{
      type:Sequelize.INTERGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type:Sequelize.STRING(150),
      allowNull: false,
   },
   cpf: {
      type:Sequelize.STRING(11),
      allowNull: false,
      unique: true
   },
   email: {
      type:Sequelize.STRING(11),
      allowNull: false,
      unique: true
   },
   password:{
      type:Sequelize.STRING(150),
      allowNull: false
   },
})