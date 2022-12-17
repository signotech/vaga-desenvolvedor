const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateClienteController } = require('../factories/create-cliente-controller');

function setupClientesRoute(app) {
  app.post('/clientes', adaptController(makeCreateClienteController()));
}

module.exports = { setupClientesRoute };
