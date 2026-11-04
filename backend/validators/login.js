const { body } = require('express-validator');

module.exports = [
  body('email').trim().toLowerCase().isEmail().withMessage('Informe um e-mail válido.'),
  body('senha').notEmpty().withMessage('Informe a senha.')
];
