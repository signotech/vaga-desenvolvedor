const { body } = require('express-validator');

module.exports = [
  body('ids').isArray({ min: 1, max: 100 }).withMessage('Selecione de 1 a 100 registros.'),
  body('ids.*').isInt({ min: 1 }).withMessage('Identificador inválido.').toInt()
];
