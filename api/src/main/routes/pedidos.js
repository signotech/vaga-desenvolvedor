const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreatePedidoController } = require('../factories/pedido/create-pedido-controller-factory');
const { makeDeleteAllPedidosController } = require('../factories/pedido/delete-all-pedidos-controller-factory');
const { makeDeletePedidoByCodigoController } = require('../factories/pedido/delete-pedido-by-codigo-controller-factory');
const { makeGetAllPedidoByClienteController } = require('../factories/pedido/get-all-pedidos-by-cliente-controller-factory');
const { makeGetAllPedidosController } = require('../factories/pedido/get-all-pedidos-controller-factory');
const { makeGetPedidoByCodigoController } = require('../factories/pedido/get-pedido-by-codigo-controller-factory');
const { makeUpdatePedidoController } = require('../factories/pedido/update-pedido-controller-factory');

function setupPedidosRoute(app) {
  app.post('/pedidos', adaptController(makeCreatePedidoController()));
  app.get('/pedidos', adaptController(makeGetAllPedidosController()));
  app.get('/pedidos/:codigoPedido', adaptController(makeGetPedidoByCodigoController()));
  app.patch('/pedidos/:codigoPedido', adaptController(makeUpdatePedidoController()));
  app.delete('/pedidos', adaptController(makeDeleteAllPedidosController()));
  app.delete('/pedidos/:codigoPedido', adaptController(makeDeletePedidoByCodigoController()));
  app.get('/clientes/:cpfCliente/pedidos', adaptController(makeGetAllPedidoByClienteController()));
}

module.exports = { setupPedidosRoute };
