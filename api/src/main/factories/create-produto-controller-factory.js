const CreateProdutoController = require('../../controllers/create-produto-controller');
const SequelizeProdutoRepository = require('../../repositories/sequelize-produto-repository');
const CreateProdutoUseCase = require('../../use-cases/create-produto-use-case');

function makeCreateProdutoController() {
  const createProdutoUseCase = new CreateProdutoUseCase(SequelizeProdutoRepository);
  return new CreateProdutoController(createProdutoUseCase);
}

module.exports = { makeCreateProdutoController };
