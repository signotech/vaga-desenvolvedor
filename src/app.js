const express = require('express');

const env = require('./config/env');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: env.appName });
});

module.exports = app;
