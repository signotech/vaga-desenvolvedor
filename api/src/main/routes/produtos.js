const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateProdutoController } = require('../factories/produto/create-produto-controller-factory');
const { makeDeleteAllProdutosController } = require('../factories/produto/delete-all-produtos-controller-factory');
const { makeDeleteProdutoBySkuController } = require('../factories/produto/delete-produto-by-sku-controller-factory');
const { makeGetAllProdutosByPedidoController } = require('../factories/produto/get-all-produtos-by-pedido-controller-factory');
const { makeGetAllProdutosController } = require('../factories/produto/get-all-produtos-controller-factory');
const { makeGetProdutoBySkuController } = require('../factories/produto/get-produto-by-sku-controller-factory');
const { makeUpdateProdutoController } = require('../factories/produto/update-produto-controller-factory');

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
