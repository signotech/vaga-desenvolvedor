const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateClienteController } = require('../factories/create-cliente-controller');
const { makeDeleteAllClientesController } = require('../factories/delete-all-clientes-controller');
const { makeDeleteClienteByCpfController } = require('../factories/delete-cliente-by-cpf-controller');
const { makeGetAllClientesController } = require('../factories/get-all-clientes-controller');
const { makeGetClienteByCpfController } = require('../factories/get-cliente-by-cpf-controller');
const { makeUpdateClienteController } = require('../factories/update-cliente-controller');

function setupClientesRoute(app) {
  app.post('/clientes', adaptController(makeCreateClienteController()));
  app.get('/clientes', adaptController(makeGetAllClientesController()));
  app.get('/clientes/:cpfCliente', adaptController(makeGetClienteByCpfController()));
  app.put('/clientes/:cpfCliente', adaptController(makeUpdateClienteController()));
  app.delete('/clientes', adaptController(makeDeleteAllClientesController()));
  app.delete('/clientes/:cpfCliente', adaptController(makeDeleteClienteByCpfController()));
}

module.exports = { setupClientesRoute };
