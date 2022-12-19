const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreatePedidoController } = require('../factories/create-pedido-controller-factory');
const { makeGetAllPedidosController } = require('../factories/get-all-pedidos-controller-factory');

function setupPedidosRoute(app) {
  app.post('/pedidos', adaptController(makeCreatePedidoController()));
  app.get('/pedidos', adaptController(makeGetAllPedidosController()));
}

module.exports = { setupPedidosRoute };
