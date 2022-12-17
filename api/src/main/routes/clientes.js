const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateClienteController } = require('../factories/create-cliente-controller');
const { makeGetAllClientesController } = require('../factories/get-all-clientes-controller');

function setupClientesRoute(app) {
  app.post('/clientes', adaptController(makeCreateClienteController()));
  app.get('/clientes', adaptController(makeGetAllClientesController()));
}

module.exports = { setupClientesRoute };
