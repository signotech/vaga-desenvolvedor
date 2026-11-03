const { body, param } = require('express-validator');
const { Pedido } = require('../models');

const itemRules = [
  body('itens').isArray({ min: 1 }).withMessage('Pedido precisa de ao menos 1 item'),
  body('itens.*.produto_id').isInt({ min: 1 }),
  body('itens.*.quantidade').isInt({ min: 1 }),
];

const create = [
  body('cliente_id').isInt({ min: 1 }),
  body('data_pedido').optional().isISO8601(),
  body('status').optional().isIn(Pedido.STATUS),
  body('desconto').optional().isFloat({ min: 0 }),
  ...itemRules,
];

const update = [
  param('id').isInt({ min: 1 }),
  body('cliente_id').optional().isInt({ min: 1 }),
  body('data_pedido').optional().isISO8601(),
  body('status').optional().isIn(Pedido.STATUS),
  body('desconto').optional().isFloat({ min: 0 }),
  body('itens').optional().isArray({ min: 1 }),
  body('itens.*.produto_id').optional().isInt({ min: 1 }),
  body('itens.*.quantidade').optional().isInt({ min: 1 }),
];

const idParam = [param('id').isInt({ min: 1 })];

module.exports = { create, update, idParam };
