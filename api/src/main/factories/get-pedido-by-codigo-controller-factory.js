const GetPedidoByCodigoController = require('../../controllers/get-pedido-by-codigo-controller');
const SequelizePedidoRepository = require('../../repositories/sequelize-pedido-repository');
const GetPedidoByCodigoUseCase = require('../../use-cases/get-pedido-by-codigo-use-case');
const PedidoControllerDecorator = require('../decorators/pedido-controller-decorator');

function makeGetPedidoByCodigoController() {
  const getPedidoByCodigoUseCase = new GetPedidoByCodigoUseCase(SequelizePedidoRepository);
  const getPedidoByCodigoController = new GetPedidoByCodigoController(getPedidoByCodigoUseCase);
  return new PedidoControllerDecorator(getPedidoByCodigoController);
}

module.exports = { makeGetPedidoByCodigoController };
