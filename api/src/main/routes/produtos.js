const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateProdutoController } = require('../factories/create-produto-controller-factory');
const { makeGetAllProdutosController } = require('../factories/get-all-produtos-controller-factory');

function setupProdutosRoute(app) {
  app.post('/produtos', adaptController(makeCreateProdutoController()));
  app.get('/produtos', adaptController(makeGetAllProdutosController()));
}

module.exports = { setupProdutosRoute };
