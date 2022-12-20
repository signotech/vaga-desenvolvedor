const DeleteResourceByIdController = require('../../../controllers/delete-resource-by-id-controller');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const DeleteProdutoBySkuUseCase = require('../../../use-cases/produto/delete-produto-by-sku-use-case');

function makeDeleteProdutoBySkuController() {
  const deleteProdutoBySkuUseCase = new DeleteProdutoBySkuUseCase(SequelizeProdutoRepository);
  return new DeleteResourceByIdController(deleteProdutoBySkuUseCase);
}

module.exports = { makeDeleteProdutoBySkuController };
