const { body } = require('express-validator');

module.exports = [
  body('sku').customSanitizer(sku => String(sku ?? '').trim() || null)
    .custom(sku => sku === null || sku.length <= 100).withMessage('O SKU deve ter até 100 caracteres.'),
  body('titulo').trim().notEmpty().withMessage('Informe o nome do produto.')
    .isLength({ max: 100 }).withMessage('O nome do produto deve ter até 100 caracteres.'),
  body('preco').isFloat({ min: 0 }).withMessage('Informe um preço válido.').toFloat(),
  body('estoque').isInt({ min: 0 }).withMessage('Informe um estoque válido.').toInt()
];
