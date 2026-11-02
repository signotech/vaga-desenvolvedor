'use strict';

const service = require('./service');
const {
  success,
  notFound,
  invalid,
  paginationMeta,
  normalizeIds,
} = require('../../helpers/api');

const PAYLOAD_ALIASES = {
  clientId: 'client_id',
  orderedAt: 'ordered_at',
  discountType: 'discount_type',
  discountValue: 'discount_value',
};

/**
 * Aceita tanto snake_case (padrão dos validadores/serviços) quanto
 * camelCase (comum em clientes JSON) no payload de pedidos.
 */
function normalizePayload(req, res, next) {
  req.body = req.body || {};

  Object.entries(PAYLOAD_ALIASES).forEach(([source, target]) => {
    if (req.body[source] !== undefined && req.body[target] === undefined) {
      req.body[target] = req.body[source];
    }
  });

  if (Array.isArray(req.body.items)) {
    req.body.items.forEach((item) => {
      if (
        item &&
        typeof item === 'object' &&
        item.productId === undefined &&
        item.product_id !== undefined
      ) {
        item.productId = item.product_id;
      }
    });
  }

  return next();
}

async function index(req, res) {
  const result = await service.list(req.query);

  return success(res, result.orders, paginationMeta(result.pagination));
}

async function show(req, res) {
  const order = await service.findByIdWithDetails(req.params.id);

  if (!order) {
    return notFound(res, 'Pedido não encontrado.');
  }

  return success(res, order);
}

async function create(req, res) {
  const order = await service.create(req.body);
  const fullOrder = await service.findByIdWithDetails(order.id);

  res.location(`/api/v1/orders/${order.id}`);

  return success(res, fullOrder, null, 201);
}

async function update(req, res) {
  const order = await service.update(req.params.id, req.body);

  if (!order) {
    return notFound(res, 'Pedido não encontrado.');
  }

  const fullOrder = await service.findByIdWithDetails(order.id);

  return success(res, fullOrder);
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    return notFound(res, 'Pedido não encontrado.');
  }

  return success(res, { id: Number(req.params.id) });
}

async function bulkDestroy(req, res) {
  const ids = normalizeIds(req);

  if (ids.length === 0) {
    return invalid(res, 'Informe ao menos um ID válido.');
  }

  const { deleted } = await service.bulkRemove(ids);

  return success(res, { deleted });
}

async function loadForPatch(req, res, next) {
  const order = await service.findByIdWithDetails(req.params.id);

  if (!order) {
    return notFound(res, 'Pedido não encontrado.');
  }

  req.body = req.body || {};

  if (req.body.client_id === undefined) {
    req.body.client_id = String(order.clientId);
  }

  if (req.body.status === undefined) {
    req.body.status = order.status;
  }

  if (req.body.ordered_at === undefined) {
    req.body.ordered_at = order.orderedAt.toISOString();
  }

  if (req.body.discount_type === undefined) {
    req.body.discount_type = order.discountType;
  }

  if (req.body.discount_value === undefined) {
    req.body.discount_value = String(order.discountValue);
  }

  if (req.body.items === undefined) {
    req.body.items = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  }

  return next();
}

module.exports = {
  normalizePayload,
  index,
  show,
  create,
  update,
  destroy,
  bulkDestroy,
  loadForPatch,
};
