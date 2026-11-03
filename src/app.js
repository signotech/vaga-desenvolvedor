
const express = require('express');

const app = express();

// Disponibiliza os arquivos HTML, CSS e JavaScript
app.use(express.static('public'));

// Carrega os Models e registra os relacionamentos
require('./models');

// Permite receber dados no formato JSON
app.use(express.json());

// Permite receber dados enviados por formulários HTML
app.use(express.urlencoded({ extended: true }));

// Importa as rotas
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

// Registra as rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de gerenciamento de pedidos funcionando!'
    });
});

module.exports = app;



