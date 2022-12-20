const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateProdutoController } = require('../factories/create-produto-controller-factory');
const { makeDeleteAllProdutosController } = require('../factories/delete-all-produtos-controller-factory');
const { makeDeleteProdutoBySkuController } = require('../factories/delete-produto-by-sku-controller-factory');
const { makeGetAllProdutosByPedidoController } = require('../factories/get-all-produtos-by-pedido-controller-factory');
const { makeGetAllProdutosController } = require('../factories/get-all-produtos-controller-factory');
const { makeGetProdutoBySkuController } = require('../factories/get-produto-by-sku-controller-factory');
const { makeUpdateProdutoController } = require('../factories/update-produto-controller-factory');

function setupProdutosRoute(app) {
  app.post('/produtos', adaptController(makeCreateProdutoController()));
  app.get('/produtos', adaptController(makeGetAllProdutosController()));
  app.get('/produtos/:skuProduto', adaptController(makeGetProdutoBySkuController()));
  app.put('/produtos/:skuProduto', adaptController(makeUpdateProdutoController()));
  app.delete('/produtos', adaptController(makeDeleteAllProdutosController()));
  app.delete('/produtos/:skuProduto', adaptController(makeDeleteProdutoBySkuController()));
  app.get('/pedidos/:codigoPedido/produtos', adaptController(makeGetAllProdutosByPedidoController()));
}

module.exports = { setupProdutosRoute };
