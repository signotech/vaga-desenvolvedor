require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const setupSwagger = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
