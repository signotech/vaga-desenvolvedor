const express = require('express');
const cors = require('cors');
const { setupClientesRoute } = require('./routes/clientes');
const { adaptErrorMiddleware } = require('./adapters/express-error-middleware-adapter');
const ErrorMiddleware = require('../middlewares/error-middleware');
const { setupProdutosRoute } = require('./routes/produtos');

const app = express();

app.use(express.json());
app.use(cors());

setupClientesRoute(app);
setupProdutosRoute(app);

app.use(adaptErrorMiddleware(ErrorMiddleware));

module.exports = app;
