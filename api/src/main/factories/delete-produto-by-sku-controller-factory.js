const DeleteProdutoBySkuController = require('../../controllers/delete-produto-by-sku-controller');
const SequelizeProdutoRepository = require('../../repositories/sequelize-produto-repository');
const DeleteProdutoBySkuUseCase = require('../../use-cases/delete-produto-by-sku-use-case');

function makeDeleteProdutoBySkuController() {
  const deleteProdutoBySkuUseCase = new DeleteProdutoBySkuUseCase(SequelizeProdutoRepository);
  return new DeleteProdutoBySkuController(deleteProdutoBySkuUseCase);
}

module.exports = { makeDeleteProdutoBySkuController };
