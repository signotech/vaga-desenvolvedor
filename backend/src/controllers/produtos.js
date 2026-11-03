const { Produto } = require('../models');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Produto, {
  searchable: ['id', 'sku', 'titulo', 'preco', 'estoque'],
});
