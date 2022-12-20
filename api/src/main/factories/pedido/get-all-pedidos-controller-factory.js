const GetAllResourcesController = require('../../../controllers/get-all-resources-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const GetAllPedidosUseCase = require('../../../use-cases/pedido/get-all-pedidos-use-case');
const PedidoControllerDecorator = require('../../decorators/pedido-controller-decorator');

function makeGetAllPedidosController() {
  const getAllPedidosUseCase = new GetAllPedidosUseCase(SequelizePedidoRepository);
  const getAllPedidosController = new GetAllResourcesController(getAllPedidosUseCase);
  return new PedidoControllerDecorator(getAllPedidosController);
}

module.exports = { makeGetAllPedidosController };
