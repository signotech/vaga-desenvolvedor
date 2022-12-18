const UpdateProdutoController = require('../../controllers/update-produto-controller');
const SequelizeProdutoRepository = require('../../repositories/sequelize-produto-repository');
const UpdateProdutoUseCase = require('../../use-cases/update-produto-use-case');

function makeUpdateProdutoController() {
  const updateProdutoUseCase = new UpdateProdutoUseCase(SequelizeProdutoRepository);
  return new UpdateProdutoController(updateProdutoUseCase);
}

module.exports = { makeUpdateProdutoController };
