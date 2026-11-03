const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  app.listen(PORT, '0.0.0.0', () => console.log(`API em http://0.0.0.0:${PORT}`));
}

start().catch((err) => {
  console.error('Falha ao iniciar:', err);
  process.exit(1);
});
