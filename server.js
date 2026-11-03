require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Testa a conexão com o banco de dados
async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Conexão com o banco de dados realizada com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}

iniciarServidor();