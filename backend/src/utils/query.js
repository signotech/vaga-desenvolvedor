const { Op } = require('sequelize');

const DEFAULT_LIMIT = 20;

function parseListQuery(query, searchable = []) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT));
  const sortBy = searchable.includes(query.sortBy) ? query.sortBy : 'id';
  const sortOrder = String(query.sortOrder || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  const where = {};
  for (const field of searchable) {
    if (query[field] === undefined || query[field] === '') continue;
    const value = query[field];
    where[field] = typeof value === 'string' && Number.isNaN(Number(value))
      ? { [Op.like]: `%${value}%` }
      : value;
  }

  const q = typeof query.q === 'string' ? query.q.trim() : '';
  if (q) {
    const digits = q.replace(/\D/g, '');
    const textFields = searchable.filter((field) => field !== 'id');
    const or = textFields.map((field) => {
      if (field === 'cpf' && digits) {
        return { [field]: { [Op.like]: `%${digits}%` } };
      }
      return { [field]: { [Op.like]: `%${q}%` } };
    });

    if (!Number.isNaN(Number(q)) && Number(q) > 0 && searchable.includes('id')) {
      or.push({ id: Number(q) });
    }

    where[Op.or] = or;
  }

  return {
    page,
    limit,
    offset: (page - 1) * limit,
    order: [[sortBy, sortOrder]],
    where,
  };
}

function paginate(rows, count, page, limit) {
  return {
    data: rows,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit) || 1,
    },
  };
}

module.exports = { parseListQuery, paginate, DEFAULT_LIMIT };
