const GetResourceByIdController = require('../../../controllers/get-resource-by-id-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const GetPedidoByCodigoUseCase = require('../../../use-cases/pedido/get-pedido-by-codigo-use-case');
const PedidoControllerDecorator = require('../../decorators/pedido-controller-decorator');

function makeGetPedidoByCodigoController() {
  const getPedidoByCodigoUseCase = new GetPedidoByCodigoUseCase(SequelizePedidoRepository);
  const getPedidoByCodigoController = new GetResourceByIdController(getPedidoByCodigoUseCase);
  return new PedidoControllerDecorator(getPedidoByCodigoController);
}

module.exports = { makeGetPedidoByCodigoController };
