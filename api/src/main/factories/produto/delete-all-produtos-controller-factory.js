const DeleteAllResourcesController = require('../../../controllers/delete-all-resources-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const DeleteAllProdutosUseCase = require('../../../use-cases/produto/delete-all-produtos-use-case');

function makeDeleteAllProdutosController() {
  const deleteAllProdutosUseCase = new DeleteAllProdutosUseCase(SequelizeProdutoRepository);
  return new DeleteAllResourcesController(deleteAllProdutosUseCase);
}

module.exports = { makeDeleteAllProdutosController };
