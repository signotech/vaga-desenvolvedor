const GetProdutoBySkuController = require('../../controllers/get-produto-by-sku-controller');
const SequelizeProdutoRepository = require('../../repositories/sequelize-produto-repository');
const GetProdutoBySkuUseCase = require('../../use-cases/get-produto-by-sku-use-case');

function makeGetProdutoBySkuController() {
  const getProdutoBySkuUseCase = new GetProdutoBySkuUseCase(SequelizeProdutoRepository);
  return new GetProdutoBySkuController(getProdutoBySkuUseCase);
}

module.exports = { makeGetProdutoBySkuController };
