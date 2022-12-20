const GetResourceByIdController = require('../../../controllers/get-resource-by-id-controller');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const GetAllPedidosByClienteUseCase = require('../../../use-cases/pedido/get-all-pedidos-by-cliente-use-case');
const PedidoControllerDecorator = require('../../decorators/pedido-controller-decorator');

function makeGetAllPedidoByClienteController() {
  const getAllPedidosByClienteUseCase = new GetAllPedidosByClienteUseCase(
    SequelizePedidoRepository,
    SequelizeClienteRepository,
  );
  const getAllPedidosByClienteController = new GetResourceByIdController(
    getAllPedidosByClienteUseCase,
  );
  return new PedidoControllerDecorator(getAllPedidosByClienteController);
}

module.exports = { makeGetAllPedidoByClienteController };
