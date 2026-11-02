'use strict';

const { Op } = require('sequelize');

const {
  sequelize,
  Order,
  OrderItem,
  Client,
  Product,
} = require('../../models');
const {
  buildWhere,
  buildOrder,
  currentSort,
} = require('../../helpers/queryBuilder');
const {
  parsePagination,
  buildPagination,
} = require('../../helpers/pagination');

// Subconsultas de total usadas apenas para ordenação. O alias `Order` é o
// alias gerado pelo Sequelize para a tabela `orders` na query externa.
const SUBTOTAL_SQL =
  '(SELECT COALESCE(SUM(oi.quantity * oi.unit_price), 0) FROM order_items oi WHERE oi.order_id = `Order`.id)';

const TOTAL_SQL = `(${SUBTOTAL_SQL} - CASE \`Order\`.discount_type
  WHEN 'percent' THEN (${SUBTOTAL_SQL}) * MIN(\`Order\`.discount_value, 100) / 100
  WHEN 'fixed' THEN MIN(\`Order\`.discount_value, (${SUBTOTAL_SQL}))
  ELSE 0 END)`;

const SORTABLE_FIELDS = [
  { key: 'id', column: 'id' },
  { key: 'client', column: [{ model: Client, as: 'client' }, 'name'] },
  { key: 'status', column: 'status' },
  { key: 'ordered_at', column: 'orderedAt' },
  { key: 'total', column: sequelize.literal(TOTAL_SQL) },
];

const DEFAULT_SORT = { key: 'id', dir: 'DESC' };

function parseDate(value) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toNumber(value) {
  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
}

const FILTERS = [
  { param: 'client_id', field: 'clientId', op: 'eq', transform: toNumber },
  { param: 'status', field: 'status', op: 'eq' },
  { param: 'discount_type', field: 'discountType', op: 'eq' },
  { param: 'ordered_from', field: 'orderedAt', op: 'gte', transform: parseDate },
  {
    param: 'ordered_to',
    field: 'orderedAt',
    op: 'lte',
    transform: (value) => {
      const date = parseDate(value);

      if (date) {
        date.setHours(23, 59, 59, 999);
      }

      return date;
    },
  },
];

function buildIncludes(query = {}) {
  const clientInclude = { model: Client, as: 'client' };
  const clientName = String(query.client || '').trim();

  if (clientName) {
    clientInclude.where = { name: { [Op.like]: `%${clientName}%` } };
    clientInclude.required = true;
  }

  return [
    clientInclude,
    { model: OrderItem, as: 'items', separate: true },
  ];
}

function normalizeItems(rawItems) {
  const list = Array.isArray(rawItems) ? rawItems : [];

  return list
    .filter((item) => item && String(item.productId ?? '').trim() !== '')
    .map((item) => ({
      productId: Number(item.productId),
      quantity: Number.parseInt(item.quantity, 10),
    }));
}

async function resolveItems(rawItems) {
  const items = normalizeItems(rawItems);

  if (items.length === 0) {
    const error = new Error('Adicione ao menos um produto ao pedido.');
    error.status = 422;
    throw error;
  }

  const products = await Product.findAll({
    where: { id: items.map((item) => item.productId) },
  });
  const productsById = new Map(
    products.map((product) => [Number(product.id), product]),
  );

  return items.map((item) => {
    const product = productsById.get(item.productId);

    if (!product) {
      const error = new Error('Produto não encontrado.');
      error.status = 422;
      throw error;
    }

    return {
      productId: product.id,
      quantity: item.quantity,
      unitPrice: Number(product.price),
    };
  });
}

function buildOrderAttributes(data) {
  return {
    clientId: Number(data.client_id),
    status: data.status || 'open',
    orderedAt: new Date(data.ordered_at),
    discountType: data.discount_type || 'none',
    discountValue: Number(data.discount_value) || 0,
  };
}

async function list(query = {}) {
  const { page, perPage, offset } = parsePagination(query);
  const where = buildWhere(query, FILTERS);
  const order = buildOrder(query, SORTABLE_FIELDS, DEFAULT_SORT);

  const { rows, count } = await Order.findAndCountAll({
    where,
    include: buildIncludes(query),
    order,
    limit: perPage,
    offset,
    distinct: true,
  });

  return {
    orders: rows,
    pagination: buildPagination({ page, perPage, total: count }),
    currentSort: currentSort(query, SORTABLE_FIELDS, DEFAULT_SORT),
  };
}

function findByIdWithDetails(id) {
  return Order.findByPk(id, {
    include: [
      { model: Client, as: 'client' },
      {
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }],
      },
    ],
    order: [[{ model: OrderItem, as: 'items' }, 'id', 'ASC']],
  });
}

async function create(data) {
  const items = await resolveItems(data.items);

  return sequelize.transaction(async (transaction) => {
    const order = await Order.create(buildOrderAttributes(data), {
      transaction,
    });

    await OrderItem.bulkCreate(
      items.map((item) => ({ ...item, orderId: order.id })),
      { transaction, validate: true },
    );

    return order;
  });
}

async function update(id, data) {
  const order = await Order.findByPk(id);

  if (!order) {
    return null;
  }

  const items = await resolveItems(data.items);

  await sequelize.transaction(async (transaction) => {
    await order.update(buildOrderAttributes(data), { transaction });

    await OrderItem.destroy({
      where: { orderId: order.id },
      transaction,
    });

    await OrderItem.bulkCreate(
      items.map((item) => ({ ...item, orderId: order.id })),
      { transaction, validate: true },
    );
  });

  return order;
}

async function remove(id) {
  const order = await Order.findByPk(id);

  if (!order) {
    return { notFound: true };
  }

  await order.destroy();

  return { removed: true };
}

async function bulkRemove(ids = []) {
  const normalizedIds = [...new Set(ids.map(Number))].filter(
    (id) => Number.isInteger(id) && id > 0,
  );

  if (normalizedIds.length === 0) {
    return { deleted: 0 };
  }

  const deleted = await Order.destroy({ where: { id: normalizedIds } });

  return { deleted };
}

module.exports = {
  list,
  findByIdWithDetails,
  create,
  update,
  remove,
  bulkRemove,
  normalizeItems,
};
