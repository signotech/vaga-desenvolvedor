const UpdateResourceController = require('../../../controllers/update-resource-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const UpdateClienteUseCase = require('../../../use-cases/pedido/update-pedido-use-case');
const PedidoControllerDecorator = require('../../decorators/pedido-controller-decorator');

function makeUpdatePedidoController() {
  const updatePedidoUseCase = new UpdateClienteUseCase(SequelizePedidoRepository);
  const updatePedidoController = new UpdateResourceController(updatePedidoUseCase);
  return new PedidoControllerDecorator(updatePedidoController);
}

module.exports = { makeUpdatePedidoController };
