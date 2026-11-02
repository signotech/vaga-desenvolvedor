'use strict';

const { body } = require('express-validator');
const { Op } = require('sequelize');

const { Client } = require('../../models');
const { isValidCpf, onlyDigits } = require('../../helpers/cpf');

async function cpfIsUnique(value, { req }) {
  const where = { cpf: value };

  if (req.params.id) {
    where.id = { [Op.ne]: Number(req.params.id) };
  }

  const existing = await Client.findOne({ where });

  if (existing) {
    throw new Error('Já existe um cliente com este CPF.');
  }

  return true;
}

async function emailIsUnique(value, { req }) {
  const where = { email: value };

  if (req.params.id) {
    where.id = { [Op.ne]: Number(req.params.id) };
  }

  const existing = await Client.findOne({ where });

  if (existing) {
    throw new Error('Já existe um cliente com este e-mail.');
  }

  return true;
}

const clientRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Informe o nome do cliente.')
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage('O nome deve ter entre 3 e 150 caracteres.'),

  body('cpf')
    .customSanitizer(onlyDigits)
    .notEmpty()
    .withMessage('Informe o CPF.')
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage('O CPF deve conter 11 dígitos.')
    .bail()
    .custom(isValidCpf)
    .withMessage('Informe um CPF válido.')
    .bail()
    .custom(cpfIsUnique),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Informe o e-mail.')
    .bail()
    .isEmail()
    .withMessage('Informe um e-mail válido.')
    .bail()
    .isLength({ max: 255 })
    .withMessage('O e-mail deve ter no máximo 255 caracteres.')
    .bail()
    .custom(emailIsUnique),
];

module.exports = { clientRules };
