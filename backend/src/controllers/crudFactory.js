const { parseListQuery, paginate } = require('../utils/query');

function crudFactory(Model, { searchable, include = [] } = {}) {
  const fields = searchable || Object.keys(Model.rawAttributes).filter((f) => f !== 'created_at' && f !== 'updated_at');

  return {
    async list(req, res, next) {
      try {
        const { page, limit, offset, order, where } = parseListQuery(req.query, fields);
        const { rows, count } = await Model.findAndCountAll({ where, include, order, limit, offset, distinct: true });
        res.json(paginate(rows, count, page, limit));
      } catch (err) {
        next(err);
      }
    },

    async get(req, res, next) {
      try {
        const item = await Model.findByPk(req.params.id, { include });
        if (!item) return res.status(404).json({ error: 'Não encontrado' });
        return res.json(item);
      } catch (err) {
        return next(err);
      }
    },

    async create(req, res, next) {
      try {
        const item = await Model.create(req.body);
        const full = include.length ? await Model.findByPk(item.id, { include }) : item;
        res.status(201).json(full);
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Não encontrado' });
        await item.update(req.body);
        const full = include.length ? await Model.findByPk(item.id, { include }) : item;
        return res.json(full);
      } catch (err) {
        return next(err);
      }
    },

    async remove(req, res, next) {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Não encontrado' });
        await item.destroy();
        return res.status(204).send();
      } catch (err) {
        return next(err);
      }
    },

    async removeMany(req, res, next) {
      try {
        const ids = [...new Set((req.body.ids || []).map(Number).filter((id) => id > 0))];
        if (!ids.length) return res.status(400).json({ error: 'Informe ao menos um id' });
        const deleted = await Model.destroy({ where: { id: ids } });
        return res.json({ deleted });
      } catch (err) {
        return next(err);
      }
    },
  };
}

module.exports = crudFactory;
