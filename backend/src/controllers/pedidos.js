const { Op } = require('sequelize');
const { Pedido, PedidoItem, Produto, Cliente, sequelize } = require('../models');
const { parseListQuery, paginate } = require('../utils/query');

const include = [
  { model: Cliente, as: 'cliente' },
  { model: PedidoItem, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
];

async function buildItens(itens, transaction) {
  const produtos = await Produto.findAll({
    where: { id: itens.map((i) => i.produto_id) },
    transaction,
  });
  const map = Object.fromEntries(produtos.map((p) => [p.id, p]));

  return itens.map((item) => {
    const produto = map[item.produto_id];
    if (!produto) {
      const err = new Error(`Produto ${item.produto_id} não encontrado`);
      err.status = 400;
      throw err;
    }
    return {
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: produto.preco,
    };
  });
}

module.exports = {
  async list(req, res, next) {
    try {
      const fields = ['id', 'cliente_id', 'data_pedido', 'status', 'desconto'];
      const { page, limit, offset, order, where } = parseListQuery(req.query, fields);
      const includes = include.map((item) => ({ ...item }));

      const clienteTerm = String(req.query.cliente || '').trim();
      if (clienteTerm) {
        if (/^\d+$/.test(clienteTerm)) {
          where.cliente_id = Number(clienteTerm);
        } else {
          includes[0] = {
            ...includes[0],
            where: { nome: { [Op.like]: `%${clienteTerm}%` } },
            required: true,
          };
        }
      }

      const { rows, count } = await Pedido.findAndCountAll({
        where,
        include: includes,
        order,
        limit,
        offset,
        distinct: true,
      });
      res.json(paginate(rows, count, page, limit));
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const pedido = await Pedido.findByPk(req.params.id, { include });
      if (!pedido) return res.status(404).json({ error: 'Não encontrado' });
      return res.json(pedido);
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const cliente = await Cliente.findByPk(req.body.cliente_id, { transaction: t });
      if (!cliente) {
        const err = new Error('Cliente não encontrado');
        err.status = 400;
        throw err;
      }

      const pedido = await Pedido.create(
        {
          cliente_id: req.body.cliente_id,
          data_pedido: req.body.data_pedido || new Date(),
          status: req.body.status || 'Em Aberto',
          desconto: req.body.desconto || 0,
        },
        { transaction: t }
      );

      const itens = await buildItens(req.body.itens, t);
      await PedidoItem.bulkCreate(
        itens.map((i) => ({ ...i, pedido_id: pedido.id })),
        { transaction: t }
      );

      await t.commit();
      const full = await Pedido.findByPk(pedido.id, { include });
      res.status(201).json(full);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  },

  async update(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const pedido = await Pedido.findByPk(req.params.id, { transaction: t });
      if (!pedido) {
        await t.rollback();
        return res.status(404).json({ error: 'Não encontrado' });
      }

      if (req.body.cliente_id) {
        const cliente = await Cliente.findByPk(req.body.cliente_id, { transaction: t });
        if (!cliente) {
          const err = new Error('Cliente não encontrado');
          err.status = 400;
          throw err;
        }
      }

      await pedido.update(
        {
          cliente_id: req.body.cliente_id ?? pedido.cliente_id,
          data_pedido: req.body.data_pedido ?? pedido.data_pedido,
          status: req.body.status ?? pedido.status,
          desconto: req.body.desconto ?? pedido.desconto,
        },
        { transaction: t }
      );

      if (req.body.itens) {
        await PedidoItem.destroy({ where: { pedido_id: pedido.id }, transaction: t });
        const itens = await buildItens(req.body.itens, t);
        await PedidoItem.bulkCreate(
          itens.map((i) => ({ ...i, pedido_id: pedido.id })),
          { transaction: t }
        );
      }

      await t.commit();
      const full = await Pedido.findByPk(pedido.id, { include });
      return res.json(full);
    } catch (err) {
      await t.rollback();
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const pedido = await Pedido.findByPk(req.params.id);
      if (!pedido) return res.status(404).json({ error: 'Não encontrado' });
      await pedido.destroy();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },

  async removeMany(req, res, next) {
    try {
      const ids = [...new Set((req.body.ids || []).map(Number).filter((id) => id > 0))];
      if (!ids.length) return res.status(400).json({ error: 'Informe ao menos um id' });
      const deleted = await Pedido.destroy({ where: { id: ids } });
      return res.json({ deleted });
    } catch (err) {
      return next(err);
    }
  },
};
