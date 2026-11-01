'use strict';

const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error);

  if (req.path.startsWith('/api')) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }

  const status = error.status || 500;

  return res.status(status).render('errors/500', {
    title: 'Erro',
    message: env.nodeEnv === 'development' ? error.message : null,
  });
}

module.exports = errorHandler;
