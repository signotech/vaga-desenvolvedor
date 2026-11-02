'use strict';

const { body } = require('express-validator');
const { Op } = require('sequelize');

const { Product } = require('../../models');

async function skuIsUnique(value, { req }) {
  const where = { sku: value };

  if (req.params.id) {
    where.id = { [Op.ne]: Number(req.params.id) };
  }

  const existing = await Product.findOne({ where });

  if (existing) {
    throw new Error('Já existe um produto com este SKU.');
  }

  return true;
}

const productRules = [
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('Informe o SKU.')
    .bail()
    .isLength({ max: 100 })
    .withMessage('O SKU deve ter no máximo 100 caracteres.')
    .bail()
    .customSanitizer((value) => value.toUpperCase())
    .custom(skuIsUnique),

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Informe o título do produto.')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('O título deve ter entre 2 e 100 caracteres.'),

  body('price')
    .notEmpty()
    .withMessage('Informe o preço.')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Informe um preço válido (maior ou igual a zero).'),

  body('stock')
    .notEmpty()
    .withMessage('Informe o estoque.')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Informe um estoque válido (inteiro maior ou igual a zero).'),
];

module.exports = { productRules };
