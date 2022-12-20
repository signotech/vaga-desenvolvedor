const CreateResourceController = require('../../../controllers/create-resource-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const CreateProdutoUseCase = require('../../../use-cases/produto/create-produto-use-case');

function makeCreateProdutoController() {
  const createProdutoUseCase = new CreateProdutoUseCase(SequelizeProdutoRepository);
  return new CreateResourceController(createProdutoUseCase);
}

module.exports = { makeCreateProdutoController };
