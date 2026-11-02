'use strict';

const { Product, Order, OrderItem, Client } = require('../../models');
const {
  buildWhere,
  buildOrder,
  currentSort,
} = require('../../helpers/queryBuilder');
const {
  parsePagination,
  buildPagination,
} = require('../../helpers/pagination');

const SORTABLE_FIELDS = [
  { key: 'id', column: 'id' },
  { key: 'sku', column: 'sku' },
  { key: 'title', column: 'title' },
  { key: 'price', column: 'price' },
  { key: 'stock', column: 'stock' },
  { key: 'created_at', column: 'createdAt' },
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
  { param: 'sku', field: 'sku', op: 'like' },
  { param: 'title', field: 'title', op: 'like' },
  { param: 'min_price', field: 'price', op: 'gte', transform: toNumber },
  { param: 'max_price', field: 'price', op: 'lte', transform: toNumber },
  { param: 'min_stock', field: 'stock', op: 'gte', transform: toNumber },
  { param: 'max_stock', field: 'stock', op: 'lte', transform: toNumber },
  { param: 'created_from', field: 'createdAt', op: 'gte', transform: parseDate },
  {
    param: 'created_to',
    field: 'createdAt',
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

function normalize(data) {
  return {
    sku: String(data.sku || '')
      .trim()
      .toUpperCase(),
    title: String(data.title || '').trim(),
    price: Number(data.price),
    stock: Number.parseInt(data.stock, 10),
  };
}

async function list(query = {}) {
  const { page, perPage, offset } = parsePagination(query);
  const where = buildWhere(query, FILTERS);
  const order = buildOrder(query, SORTABLE_FIELDS, DEFAULT_SORT);

  const { rows, count } = await Product.findAndCountAll({
    where,
    order,
    limit: perPage,
    offset,
  });

  return {
    products: rows,
    pagination: buildPagination({ page, perPage, total: count }),
    currentSort: currentSort(query, SORTABLE_FIELDS, DEFAULT_SORT),
  };
}

function findById(id) {
  return Product.findByPk(id);
}

async function findByIdWithOrders(id) {
  const product = await Product.findByPk(id);

  if (!product) {
    return { product: null, items: [] };
  }

  const items = await OrderItem.findAll({
    where: { productId: product.id },
    include: [
      {
        model: Order,
        as: 'order',
        include: [{ model: Client, as: 'client' }],
      },
    ],
    order: [[{ model: Order, as: 'order' }, 'orderedAt', 'DESC']],
    limit: 10,
  });

  return { product, items };
}

function create(data) {
  return Product.create(normalize(data));
}

async function update(id, data) {
  const product = await Product.findByPk(id);

  if (!product) {
    return null;
  }

  await product.update(normalize(data));

  return product;
}

async function remove(id) {
  const product = await Product.findByPk(id);

  if (!product) {
    return { notFound: true };
  }

  try {
    await product.destroy();

    return { removed: true };
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return { hasOrders: true };
    }

    throw error;
  }
}

async function bulkRemove(ids = []) {
  const normalizedIds = [...new Set(ids.map(Number))].filter(
    (id) => Number.isInteger(id) && id > 0,
  );

  if (normalizedIds.length === 0) {
    return { deleted: 0, skipped: 0 };
  }

  const usedProducts = await OrderItem.findAll({
    where: { productId: normalizedIds },
    attributes: ['productId'],
    group: ['productId'],
    raw: true,
  });

  const blockedIds = new Set(
    usedProducts.map((item) => item.productId),
  );
  const deletableIds = normalizedIds.filter((id) => !blockedIds.has(id));

  let deleted = 0;

  if (deletableIds.length > 0) {
    deleted = await Product.destroy({ where: { id: deletableIds } });
  }

  return {
    deleted,
    skipped: normalizedIds.length - deletableIds.length,
  };
}

module.exports = {
  list,
  findById,
  findByIdWithOrders,
  create,
  update,
  remove,
  bulkRemove,
};
