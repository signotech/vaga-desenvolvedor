'use strict';

const { User } = require('../models');

/**
 * Carrega o usuário da sessão em `res.locals.currentUser`, usado pelo
 * layout/navbar. Também limpa sessões que apontam para usuários removidos.
 */
async function loadCurrentUser(req, res, next) {
  res.locals.currentUser = null;

  if (!req.session.userId) {
    return next();
  }

  const user = await User.findByPk(req.session.userId);

  if (!user) {
    delete req.session.userId;
    return next();
  }

  res.locals.currentUser = user;

  return next();
}

function requireAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  }

  if (req.method === 'GET') {
    req.session.returnTo = req.originalUrl;
  }

  req.flash('error', 'Faça login para continuar.');

  return res.redirect('/login');
}

function redirectIfAuthenticated(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/');
  }

  return next();
}

module.exports = {
  loadCurrentUser,
  requireAuth,
  redirectIfAuthenticated,
};
