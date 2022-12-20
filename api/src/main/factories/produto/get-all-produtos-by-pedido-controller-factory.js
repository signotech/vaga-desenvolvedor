const GetResourceByIdController = require('../../../controllers/get-resource-by-id-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const GetAllProdutosByPedidoUseCase = require('../../../use-cases/produto/get-all-produtos-by-pedido-use-case');

function makeGetAllProdutosByPedidoController() {
  const getAllProdutosByPedidoUseCase = new GetAllProdutosByPedidoUseCase(
    SequelizePedidoRepository,
  );
  return new GetResourceByIdController(getAllProdutosByPedidoUseCase);
}

module.exports = { makeGetAllProdutosByPedidoController };
