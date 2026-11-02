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

  return success(res, result.products, paginationMeta(result.pagination));
}

async function show(req, res) {
  const product = await service.findById(req.params.id);

  if (!product) {
    return notFound(res, 'Produto não encontrado.');
  }

  return success(res, product);
}

async function create(req, res) {
  const product = await service.create(req.body);

  res.location(`/api/v1/products/${product.id}`);

  return success(res, product, null, 201);
}

async function update(req, res) {
  const product = await service.update(req.params.id, req.body);

  if (!product) {
    return notFound(res, 'Produto não encontrado.');
  }

  return success(res, product);
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    return notFound(res, 'Produto não encontrado.');
  }

  if (result.hasOrders) {
    return res.status(409).json({
      error: 'Não é possível excluir um produto que está em pedidos vinculados.',
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

async function loadForPatch(req, res, next) {
  const product = await service.findById(req.params.id);

  if (!product) {
    return notFound(res, 'Produto não encontrado.');
  }

  req.body = req.body || {};

  if (req.body.sku === undefined) req.body.sku = product.sku;
  if (req.body.title === undefined) req.body.title = product.title;
  if (req.body.price === undefined) req.body.price = product.price;
  if (req.body.stock === undefined) req.body.stock = product.stock;

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
