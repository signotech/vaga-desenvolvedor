const ValidationError = require('../errors/validation-error');

function validateCpfCliente(cpfCliente) {
  if (cpfCliente === undefined) {
    throw new ValidationError('O campo cpfCliente é obrigatório');
  }
  if (typeof cpfCliente !== 'string') {
    throw new ValidationError('O campo cpfCliente deve ser uma string');
  }
  const cpfFormat = /^\d{11}$/;
  if (!cpfCliente.match(cpfFormat)) {
    throw new ValidationError('O campo cpfCliente deve conter 11 dígitos');
  }
}

module.exports = { validateCpfCliente };
