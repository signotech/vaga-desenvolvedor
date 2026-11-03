const { Cliente } = require('../models');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Cliente, {
  searchable: ['id', 'nome', 'cpf', 'email'],
});
