const GetResourceByIdController = require('../../../controllers/get-resource-by-id-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const GetProdutoBySkuUseCase = require('../../../use-cases/produto/get-produto-by-sku-use-case');

function makeGetProdutoBySkuController() {
  const getProdutoBySkuUseCase = new GetProdutoBySkuUseCase(SequelizeProdutoRepository);
  return new GetResourceByIdController(getProdutoBySkuUseCase);
}

module.exports = { makeGetProdutoBySkuController };
