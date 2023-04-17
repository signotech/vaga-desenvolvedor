
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: true,
        define: {
            timestamps: false,
            underscored: true
        }
    }
};