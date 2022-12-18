const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateClienteController } = require('../factories/create-cliente-controller-factory');
const { makeDeleteAllClientesController } = require('../factories/delete-all-clientes-controller-factory');
const { makeDeleteClienteByCpfController } = require('../factories/delete-cliente-by-cpf-controller-factory');
const { makeGetAllClientesController } = require('../factories/get-all-clientes-controller-factory');
const { makeGetClienteByCpfController } = require('../factories/get-cliente-by-cpf-controller-factory');
const { makeUpdateClienteController } = require('../factories/update-cliente-controller-factory');

function setupClientesRoute(app) {
  app.post('/clientes', adaptController(makeCreateClienteController()));
  app.get('/clientes', adaptController(makeGetAllClientesController()));
  app.get('/clientes/:cpfCliente', adaptController(makeGetClienteByCpfController()));
  app.put('/clientes/:cpfCliente', adaptController(makeUpdateClienteController()));
  app.delete('/clientes', adaptController(makeDeleteAllClientesController()));
  app.delete('/clientes/:cpfCliente', adaptController(makeDeleteClienteByCpfController()));
}

module.exports = { setupClientesRoute };
