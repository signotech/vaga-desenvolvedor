const { body } = require('express-validator');

const login = [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').isString().isLength({ min: 4 }).withMessage('Senha obrigatória'),
];

module.exports = { login };
