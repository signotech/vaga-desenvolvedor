const DeleteAllProdutosController = require('../../controllers/delete-all-produtos-controller');
const SequelizeProdutoRepository = require('../../repositories/sequelize-produto-repository');
const DeleteAllProdutosUseCase = require('../../use-cases/delete-all-produtos-use-case');

function makeDeleteAllProdutosController() {
  const deleteAllProdutosUseCase = new DeleteAllProdutosUseCase(SequelizeProdutoRepository);
  return new DeleteAllProdutosController(deleteAllProdutosUseCase);
}

module.exports = { makeDeleteAllProdutosController };
