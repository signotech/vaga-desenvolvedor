const { body, param } = require('express-validator');

const cpf = body('cpf')
  .isLength({ min: 11, max: 11 })
  .withMessage('CPF deve ter 11 dígitos')
  .matches(/^\d{11}$/)
  .withMessage('CPF deve conter apenas números');

const create = [
  body('nome').trim().notEmpty().isLength({ max: 150 }),
  cpf,
  body('email').isEmail().isLength({ max: 255 }),
];

const update = [
  param('id').isInt({ min: 1 }),
  body('nome').optional().trim().notEmpty().isLength({ max: 150 }),
  body('cpf').optional().isLength({ min: 11, max: 11 }).matches(/^\d{11}$/),
  body('email').optional().isEmail().isLength({ max: 255 }),
];

const idParam = [param('id').isInt({ min: 1 })];

module.exports = { create, update, idParam };
