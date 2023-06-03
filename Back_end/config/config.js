require('dotenv').config()

const PORT = parseInt(process.env.PORT);

   module.exports=
{
   "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB,
      "host": PORT,
      "dialect": process.env.DB_DIALECT,
      "logging":true
   },
   "test": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB,
      "host": PORT,
      "dialect": process.env.DB_DIALECT,
      "logging":true
   },
   "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB,
      "host": PORT,
      "dialect": process.env.DB_DIALECT,
      "logging":false
   },
}



