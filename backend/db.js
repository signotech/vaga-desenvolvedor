const { Sequelize } = require("sequelize")
const dotenv = require("dotenv/config")

const dbName = process.env.DB_name
const dbUser = process.env.DB_user
const dbPassword = process.env.DB_password
const dbHost = process.env.DB_Host

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: dbHost
})

module.exports = { sequelize }
