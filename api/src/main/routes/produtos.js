const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateProdutoController } = require('../factories/create-produto-controller-factory');

function setupProdutosRoute(app) {
  app.post('/produtos', adaptController(makeCreateProdutoController()));
}

module.exports = { setupProdutosRoute };
