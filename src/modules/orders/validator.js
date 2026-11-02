'use strict';

const { body } = require('express-validator');

const { Client, Product, Order } = require('../../models');

function filterItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(
    (item) => item && String(item.productId ?? '').trim() !== '',
  );
}

const orderRules = [
  body('client_id')
    .notEmpty()
    .withMessage('Selecione um cliente.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Selecione um cliente válido.')
    .bail()
    .custom(async (value) => {
      const client = await Client.findByPk(value);

      if (!client) {
        throw new Error('Selecione um cliente válido.');
      }

      return true;
    }),

  body('status')
    .notEmpty()
    .withMessage('Selecione o status.')
    .bail()
    .isIn(Order.STATUSES)
    .withMessage('Status inválido.'),

  body('ordered_at')
    .notEmpty()
    .withMessage('Informe a data do pedido.')
    .bail()
    .isISO8601()
    .withMessage('Informe uma data válida.'),

  body('discount_type')
    .optional({ values: 'falsy' })
    .isIn(Order.DISCOUNT_TYPES)
    .withMessage('Tipo de desconto inválido.'),

  body('discount_value')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0 })
    .withMessage('O desconto deve ser maior ou igual a zero.')
    .bail()
    .custom((value, { req }) => {
      if (
        req.body.discount_type === 'percent' &&
        Number(value) > 100
      ) {
        throw new Error('O desconto percentual deve ser no máximo 100%.');
      }

      return true;
    }),

  body('items')
    .customSanitizer(filterItems)
    .isArray({ min: 1 })
    .withMessage('Adicione ao menos um produto ao pedido.'),

  body('items.*.productId')
    .notEmpty()
    .withMessage('Selecione um produto.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Produto inválido.')
    .bail()
    .custom(async (value) => {
      const product = await Product.findByPk(value);

      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      return true;
    }),

  body('items.*.quantity')
    .notEmpty()
    .withMessage('Informe a quantidade.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('A quantidade deve ser pelo menos 1.'),

  body('items').custom((items) => {
    const ids = items.map((item) => Number(item.productId));

    if (new Set(ids).size !== ids.length) {
      throw new Error('Não repita o mesmo produto no pedido.');
    }

    return true;
  }),
];

module.exports = { orderRules };
