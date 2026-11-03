const { body, param } = require('express-validator');

const create = [
  body('sku').trim().notEmpty().isLength({ max: 100 }),
  body('titulo').trim().notEmpty().isLength({ max: 100 }),
  body('preco').isFloat({ min: 0 }),
  body('estoque').optional().isInt({ min: 0 }),
];

const update = [
  param('id').isInt({ min: 1 }),
  body('sku').optional().trim().notEmpty().isLength({ max: 100 }),
  body('titulo').optional().trim().notEmpty().isLength({ max: 100 }),
  body('preco').optional().isFloat({ min: 0 }),
  body('estoque').optional().isInt({ min: 0 }),
];

const idParam = [param('id').isInt({ min: 1 })];

module.exports = { create, update, idParam };
