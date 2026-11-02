'use strict';

const service = require('./service');

const AUTH_ERROR = 'E-mail ou senha inválidos.';

function loginLocals({ email = '', errors = {}, authError = null }) {
  return {
    title: 'Entrar',
    email,
    errors,
    authError,
  };
}

function regenerateSession(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

/**
 * Aceita apenas caminhos internos, evitando open redirect no retorno
 * após o login.
 */
function safeRedirect(value) {
  if (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//')
  ) {
    return value;
  }

  return '/';
}

function loginForm(req, res) {
  return res.render('auth/login', loginLocals({}));
}

async function login(req, res) {
  if (req.validationErrors) {
    return res.status(422).render(
      'auth/login',
      loginLocals({
        email: req.body.email,
        errors: req.validationErrors,
      }),
    );
  }

  const user = await service.authenticate(req.body.email, req.body.password);

  if (!user) {
    return res.status(401).render(
      'auth/login',
      loginLocals({ email: req.body.email, authError: AUTH_ERROR }),
    );
  }

  const returnTo = req.session.returnTo;

  await regenerateSession(req);

  req.session.userId = user.id;
  await saveSession(req);

  return res.redirect(safeRedirect(returnTo));
}

async function logout(req, res) {
  await destroySession(req);
  res.clearCookie('connect.sid');

  return res.redirect('/login');
}

module.exports = {
  loginForm,
  login,
  logout,
};
