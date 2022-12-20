const DeleteResourceByIdController = require('../../../controllers/delete-resource-by-id-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const DeletePedidoByCodigoUseCase = require('../../../use-cases/pedido/delete-pedido-by-codigo-use-case');

function makeDeletePedidoByCodigoController() {
  const deletePedidoByCodigoUseCase = new DeletePedidoByCodigoUseCase(SequelizePedidoRepository);
  return new DeleteResourceByIdController(deletePedidoByCodigoUseCase);
}

module.exports = { makeDeletePedidoByCodigoController };
