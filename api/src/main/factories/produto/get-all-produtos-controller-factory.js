const GetAllResourcesController = require('../../../controllers/get-all-resources-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const GetAllProdutosUseCase = require('../../../use-cases/produto/get-all-produtos-use-case');

function makeGetAllProdutosController() {
  const getAllProdutosUseCase = new GetAllProdutosUseCase(SequelizeProdutoRepository);
  return new GetAllResourcesController(getAllProdutosUseCase);
}

module.exports = { makeGetAllProdutosController };
