'use strict';

const env = require('../config/env');

function isApiRequest(req) {
  return req.path.startsWith('/api');
}

/**
 * Evita open redirect: só aceita o Referer quando ele aponta para o
 * mesmo host da aplicação.
 */
function backUrl(req) {
  const referer = req.get('referer');

  if (!referer) {
    return '/';
  }

  try {
    const url = new URL(referer);

    if (url.host === req.get('host')) {
      return `${url.pathname}${url.search}`;
    }
  } catch (error) {
    // Referer inválido: cai no fallback abaixo.
  }

  return '/';
}

function apiError(res, status, message, details) {
  return res.status(status).json({
    error: message,
    ...(details && details.length > 0 ? { errors: details } : {}),
  });
}

function validationDetails(error) {
  return error.errors.map((item) => ({
    field: item.path || item.field || null,
    message: item.message,
  }));
}

function databaseErrorResponse(error, req, res) {
  const isApi = isApiRequest(req);

  if (error.name === 'SequelizeUniqueConstraintError') {
    const message = 'Já existe um registro com os dados informados.';

    if (isApi) {
      return apiError(res, 409, message, validationDetails(error));
    }

    req.flash('error', message);
    res.redirect(backUrl(req));

    return true;
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    const message =
      'Não é possível concluir a operação porque o registro está vinculado a outros registros.';

    if (isApi) {
      return apiError(res, 409, message);
    }

    req.flash('error', message);
    res.redirect(backUrl(req));

    return true;
  }

  if (error.name === 'SequelizeValidationError') {
    const message = 'Não foi possível salvar os dados informados.';

    if (isApi) {
      return apiError(res, 422, message, validationDetails(error));
    }

    const detail =
      error.errors && error.errors[0] ? error.errors[0].message : '';

    req.flash('error', detail ? `${message} ${detail}` : message);
    res.redirect(backUrl(req));

    return true;
  }

  return null;
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === 'entity.parse.failed' && isApiRequest(req)) {
    return apiError(res, 400, 'JSON inválido.');
  }

  const databaseResponse = databaseErrorResponse(error, req, res);

  if (databaseResponse) {
    return databaseResponse;
  }

  console.error(error);

  if (isApiRequest(req)) {
    return apiError(res, 500, 'Erro interno do servidor.');
  }

  const status = error.status || 500;

  return res.status(status).render('errors/500', {
    title: 'Erro',
    message: env.nodeEnv === 'development' ? error.message : null,
  });
}

module.exports = errorHandler;
