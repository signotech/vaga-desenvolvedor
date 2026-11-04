const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../front/public')));
app.use('/api', require('./routes'));
app.use(require('./middlewares/tratarErros'));

module.exports = app;
