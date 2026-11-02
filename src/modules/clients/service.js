'use strict';

const { Client, Order, OrderItem } = require('../../models');
const {
  buildWhere,
  buildOrder,
  currentSort,
} = require('../../helpers/queryBuilder');
const {
  parsePagination,
  buildPagination,
} = require('../../helpers/pagination');
const { onlyDigits } = require('../../helpers/cpf');

const SORTABLE_FIELDS = [
  { key: 'id', column: 'id' },
  { key: 'name', column: 'name' },
  { key: 'cpf', column: 'cpf' },
  { key: 'email', column: 'email' },
  { key: 'created_at', column: 'createdAt' },
];

const DEFAULT_SORT = { key: 'id', dir: 'DESC' };

function parseDate(value) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

const FILTERS = [
  { param: 'name', field: 'name', op: 'like' },
  { param: 'cpf', field: 'cpf', op: 'like', transform: onlyDigits },
  { param: 'email', field: 'email', op: 'like' },
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
    name: String(data.name || '').trim(),
    cpf: onlyDigits(data.cpf),
    email: String(data.email || '')
      .trim()
      .toLowerCase(),
  };
}

async function list(query = {}) {
  const { page, perPage, offset } = parsePagination(query);
  const where = buildWhere(query, FILTERS);
  const order = buildOrder(query, SORTABLE_FIELDS, DEFAULT_SORT);

  const { rows, count } = await Client.findAndCountAll({
    where,
    order,
    limit: perPage,
    offset,
  });

  return {
    clients: rows,
    pagination: buildPagination({ page, perPage, total: count }),
    currentSort: currentSort(query, SORTABLE_FIELDS, DEFAULT_SORT),
  };
}

function findById(id) {
  return Client.findByPk(id);
}

async function findByIdWithOrders(id) {
  const client = await Client.findByPk(id);

  if (!client) {
    return { client: null, orders: [] };
  }

  const orders = await Order.findAll({
    where: { clientId: client.id },
    include: [{ model: OrderItem, as: 'items' }],
    order: [['orderedAt', 'DESC']],
    limit: 10,
  });

  return { client, orders };
}

function create(data) {
  return Client.create(normalize(data));
}

async function update(id, data) {
  const client = await Client.findByPk(id);

  if (!client) {
    return null;
  }

  await client.update(normalize(data));

  return client;
}

async function remove(id) {
  const client = await Client.findByPk(id);

  if (!client) {
    return { notFound: true };
  }

  try {
    await client.destroy();

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

  const clientsWithOrders = await Order.findAll({
    where: { clientId: normalizedIds },
    attributes: ['clientId'],
    group: ['clientId'],
    raw: true,
  });

  const blockedIds = new Set(clientsWithOrders.map((order) => order.clientId));
  const deletableIds = normalizedIds.filter((id) => !blockedIds.has(id));

  let deleted = 0;

  if (deletableIds.length > 0) {
    deleted = await Client.destroy({ where: { id: deletableIds } });
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
