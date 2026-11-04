require('dotenv').config({ quiet: true });
const app = require('./app');
const { sequelize } = require('./database/models');

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`)))
  .catch(erro => {
    console.error('Não foi possível conectar ao banco de dados:', erro);
    process.exit(1);
  });
