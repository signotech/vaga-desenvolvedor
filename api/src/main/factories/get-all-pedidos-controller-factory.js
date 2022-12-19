const GetAllPedidosController = require('../../controllers/get-all-pedidos-controller');
const SequelizePedidoRepository = require('../../repositories/sequelize-pedido-repository');
const GetAllPedidosUseCase = require('../../use-cases/get-all-pedidos-use-case');
const PedidoControllerDecorator = require('../decorators/pedido-controller-decorator');

function makeGetAllPedidosController() {
  const getAllPedidosUseCase = new GetAllPedidosUseCase(SequelizePedidoRepository);
  const getAllPedidosController = new GetAllPedidosController(getAllPedidosUseCase);
  return new PedidoControllerDecorator(getAllPedidosController);
}

module.exports = { makeGetAllPedidosController };
