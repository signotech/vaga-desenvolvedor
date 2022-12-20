const UpdateResourceController = require('../../../controllers/update-resource-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const UpdateProdutoUseCase = require('../../../use-cases/produto/update-produto-use-case');

function makeUpdateProdutoController() {
  const updateProdutoUseCase = new UpdateProdutoUseCase(SequelizeProdutoRepository);
  return new UpdateResourceController(updateProdutoUseCase);
}

module.exports = { makeUpdateProdutoController };
