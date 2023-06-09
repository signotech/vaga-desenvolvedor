const express = require('express');
//importando o cors pra acessar a api no app
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json());
//sem parametro, liberado acesso pra todos
app.use(cors());
app.use(router); 




module.exports = app;
