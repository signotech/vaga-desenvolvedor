import "dotenv/config";

const PORT: number = parseInt(process.env.PORT!);

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
   host:PORT,
   dialect:process.env.DB_DIALECT
})

module.exports = sequelize

export default sequelize