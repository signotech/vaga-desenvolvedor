const app = require('./app');

require('dotenv').config();

console.log('start.js Ativado');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
console.log('MYSQL_DB:', process.env.MYSQL_DB);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

const PORT = process.env.PORT || 3333; //caso ocorra algum erro na variavel de ambiente
app.listen(PORT,()=> console.log(`Servidor rodando na porta ${PORT}`));

