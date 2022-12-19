const ValidationError = require('../errors/validation-error');
const { validateCpfCliente } = require('./cpf-validator');

class Cliente {
  constructor({ cpfCliente, nomeCliente, emailCliente }) {
    validateCpfCliente(cpfCliente);
    if (nomeCliente === undefined) {
      throw new ValidationError('O campo nomeCliente é obrigatório');
    }
    if (typeof nomeCliente !== 'string') {
      throw new ValidationError('O campo nomeCliente deve ser uma string');
    }
    if (emailCliente === undefined) {
      throw new ValidationError('O campo emailCliente é obrigatório');
    }
    if (typeof emailCliente !== 'string') {
      throw new ValidationError('O campo emailCliente deve ser uma string');
    }
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailCliente.match(emailFormat)) {
      throw new ValidationError('O campo emailCliente deve ser um email válido');
    }
    this.cpfCliente = cpfCliente;
    this.nomeCliente = nomeCliente;
    this.emailCliente = emailCliente;
  }
}

module.exports = Cliente;
