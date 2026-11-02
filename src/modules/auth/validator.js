'use strict';

const { body } = require('express-validator');

const loginRules = [
  body('email')
    .customSanitizer((value) =>
      String(value || '')
        .trim()
        .toLowerCase(),
    )
    .notEmpty()
    .withMessage('Informe o e-mail.')
    .bail()
    .isEmail()
    .withMessage('Informe um e-mail válido.'),

  body('password')
    .notEmpty()
    .withMessage('Informe a senha.'),
];

module.exports = { loginRules };
