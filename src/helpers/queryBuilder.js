'use strict';

const { Op } = require('sequelize');

/**
 * Constrói o objeto `where` do Sequelize a partir de uma lista de filtros
 * permitidos. Isso evita que parâmetros arbitrários da query cheguem ao banco.
 *
 * Cada filtro tem o formato:
 * { param: 'min_price', field: 'price', op: 'gte', transform: Number }
 */
function buildWhere(query = {}, filters = []) {
  const where = {};

  filters.forEach((filter) => {
    const { param, field, op = 'like', transform } = filter;
    const rawValue = query[param];

    if (
      rawValue === undefined ||
      rawValue === null ||
      String(rawValue).trim() === ''
    ) {
      return;
    }

    const value = transform ? transform(rawValue) : rawValue;

    if (value === undefined || value === null) {
      return;
    }

    switch (op) {
      case 'like':
        where[field] = { [Op.like]: `%${value}%` };
        break;
      case 'eq':
        where[field] = value;
        break;
      case 'gte':
        where[field] = { ...(where[field] || {}), [Op.gte]: value };
        break;
      case 'lte':
        where[field] = { ...(where[field] || {}), [Op.lte]: value };
        break;
      default:
        where[field] = value;
    }
  });

  return where;
}

/**
 * Resolve a ordenação a partir de uma whitelist de campos.
 * `allowedSorts` é uma lista de { key, column }.
 */
function buildOrder(query = {}, allowedSorts = [], defaultSort = { key: 'id', dir: 'DESC' }) {
  const chosen =
    allowedSorts.find((option) => option.key === query.sort) ||
    allowedSorts.find((option) => option.key === defaultSort.key);

  const column = chosen ? chosen.column : 'id';
  const requestedDir = query.sort ? query.dir : defaultSort.dir;
  const direction = String(requestedDir).toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  if (Array.isArray(column)) {
    return [[...column, direction]];
  }

  return [[column, direction]];
}

/**
 * Retorna o campo/direção atualmente aplicados (para destacar a coluna na view).
 */
function currentSort(query = {}, allowedSorts = [], defaultSort = { key: 'id', dir: 'DESC' }) {
  const chosen = allowedSorts.find((option) => option.key === query.sort);

  if (!chosen) {
    return {
      sort: defaultSort.key,
      dir: String(defaultSort.dir).toLowerCase() === 'asc' ? 'asc' : 'desc',
    };
  }

  return {
    sort: chosen.key,
    dir: String(query.dir).toLowerCase() === 'asc' ? 'asc' : 'desc',
  };
}

module.exports = { buildWhere, buildOrder, currentSort };
