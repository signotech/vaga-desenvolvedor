'use strict';

const service = require('./service');
const {
  success,
  notFound,
  invalid,
  paginationMeta,
  normalizeIds,
} = require('../../helpers/api');

async function index(req, res) {
  const result = await service.list(req.query);

  return success(res, result.clients, paginationMeta(result.pagination));
}

async function show(req, res) {
  const client = await service.findById(req.params.id);

  if (!client) {
    return notFound(res, 'Cliente não encontrado.');
  }

  return success(res, client);
}

async function create(req, res) {
  const client = await service.create(req.body);

  res.location(`/api/v1/clients/${client.id}`);

  return success(res, client, null, 201);
}

async function update(req, res) {
  const client = await service.update(req.params.id, req.body);

  if (!client) {
    return notFound(res, 'Cliente não encontrado.');
  }

  return success(res, client);
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    return notFound(res, 'Cliente não encontrado.');
  }

  if (result.hasOrders) {
    return res.status(409).json({
      error: 'Não é possível excluir um cliente que possui pedidos vinculados.',
    });
  }

  return success(res, { id: Number(req.params.id) });
}

async function bulkDestroy(req, res) {
  const ids = normalizeIds(req);

  if (ids.length === 0) {
    return invalid(res, 'Informe ao menos um ID válido.');
  }

  const { deleted, skipped } = await service.bulkRemove(ids);

  return success(res, { deleted, skipped });
}

/**
 * Em PATCH, completa os campos ausentes com os valores atuais para que as
 * regras de validação e a atualização funcionem com payloads parciais.
 */
async function loadForPatch(req, res, next) {
  const client = await service.findById(req.params.id);

  if (!client) {
    return notFound(res, 'Cliente não encontrado.');
  }

  req.body = req.body || {};

  if (req.body.name === undefined) req.body.name = client.name;
  if (req.body.cpf === undefined) req.body.cpf = client.cpf;
  if (req.body.email === undefined) req.body.email = client.email;

  return next();
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  bulkDestroy,
  loadForPatch,
};
