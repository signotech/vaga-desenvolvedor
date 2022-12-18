const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateProdutoController } = require('../factories/create-produto-controller-factory');
const { makeGetAllProdutosController } = require('../factories/get-all-produtos-controller-factory');
const { makeGetProdutoBySkuController } = require('../factories/get-produto-by-sku-controller-factory');

function setupProdutosRoute(app) {
  app.post('/produtos', adaptController(makeCreateProdutoController()));
  app.get('/produtos', adaptController(makeGetAllProdutosController()));
  app.get('/produtos/:skuProduto', adaptController(makeGetProdutoBySkuController()));
}

module.exports = { setupProdutosRoute };
