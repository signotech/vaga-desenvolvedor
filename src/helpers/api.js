'use strict';

function success(res, data, meta, status = 200) {
  const body = { data };

  if (meta) {
    body.meta = meta;
  }

  return res.status(status).json(body);
}

function error(res, status, message, errors) {
  const body = { error: message };

  if (errors && errors.length > 0) {
    body.errors = errors;
  }

  return res.status(status).json(body);
}

function notFound(res, message = 'Recurso não encontrado.') {
  return error(res, 404, message);
}

function invalid(res, message = 'Dados inválidos.', errors) {
  return error(res, 422, message, errors);
}

function paginationMeta(pagination) {
  return {
    page: pagination.page,
    perPage: pagination.perPage,
    total: pagination.total,
    lastPage: pagination.lastPage,
    from: pagination.from,
    to: pagination.to,
  };
}

/**
 * Aceita `ids` como array (JSON) ou lista separada por vírgulas
 * (`?ids=1,2,3`), removendo duplicados e valores inválidos.
 */
function normalizeIds(req) {
  const raw =
    req.body && req.body.ids !== undefined ? req.body.ids : req.query.ids;
  const list = Array.isArray(raw) ? raw : String(raw || '').split(',');

  return [
    ...new Set(
      list
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0),
    ),
  ];
}

module.exports = {
  success,
  error,
  notFound,
  invalid,
  paginationMeta,
  normalizeIds,
};
