const express = require('express');
const cors = require('cors');
const { setupClientesRoute } = require('./routes/clientes');
const { adaptErrorMiddleware } = require('./adapters/express-error-middleware-adapter');
const ErrorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());
app.use(cors());

setupClientesRoute(app);
app.use(adaptErrorMiddleware(new ErrorMiddleware()));

module.exports = app;
