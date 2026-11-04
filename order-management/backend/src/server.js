'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const app = require('./app');
const sequelize = require('./models/index');

const PORT = parseInt(process.env.PORT) || 3000;
const HOST = '0.0.0.0'; // Escuta em todas as interfaces para o Docker

async function startServer() {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    const server = app.listen(PORT, HOST, () => {
      console.log(`🚀 OrderFlow API running on http://${HOST}:${PORT}`);
      console.log(`📚 Swagger docs: http://localhost:${PORT}/api/docs`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Encerramento controlado
    const shutdown = async (signal) => {
      console.log(`\n📴 ${signal} received. Closing server...`);
      server.close(async () => {
        await sequelize.close();
        console.log('Database connection closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
