const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreatePedidoController } = require('../factories/create-pedido-controller-factory');
const { makeGetAllPedidosController } = require('../factories/get-all-pedidos-controller-factory');
const { makeGetPedidoByCodigoController } = require('../factories/get-pedido-by-codigo-controller-factory');

function setupPedidosRoute(app) {
  app.post('/pedidos', adaptController(makeCreatePedidoController()));
  app.get('/pedidos', adaptController(makeGetAllPedidosController()));
  app.get('/pedidos/:codigoPedido', adaptController(makeGetPedidoByCodigoController()));
}

module.exports = { setupPedidosRoute };
