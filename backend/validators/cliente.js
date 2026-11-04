const { body } = require('express-validator');
const { cpfValido } = require('../utils/cpf');

module.exports = [
  body('nome').trim().notEmpty().withMessage('Informe o nome.')
    .isLength({ max: 150 }).withMessage('O nome deve ter até 150 caracteres.'),
  body('cpf').customSanitizer(cpf => String(cpf ?? '').replace(/\D/g, '') || null)
    .custom(cpf => cpf === null || cpfValido(cpf)).withMessage('CPF inválido.'),
  body('email').trim().toLowerCase().isEmail().withMessage('Informe um e-mail válido.')
    .isLength({ max: 255 }).withMessage('O e-mail deve ter até 255 caracteres.')
];
