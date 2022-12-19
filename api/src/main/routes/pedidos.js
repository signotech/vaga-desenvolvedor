const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreatePedidoController } = require('../factories/create-pedido-controller-factory');

function setupPedidosRoute(app) {
  app.post('/pedidos', adaptController(makeCreatePedidoController()));
}

module.exports = { setupPedidosRoute };
