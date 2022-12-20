const CreateResourceController = require('../../../controllers/create-resource-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const SequelizePedidoRepository = require('../../../repositories/sequelize-pedido-repository');
const SequelizeProdutoRepository = require('../../../repositories/sequelize-produto-repository');
const CreatePedidoUseCase = require('../../../use-cases/pedido/create-pedido-use-case');
const PedidoControllerDecorator = require('../../decorators/pedido-controller-decorator');

function makeCreatePedidoController() {
  const createPedidoUseCase = new CreatePedidoUseCase(
    SequelizePedidoRepository,
    SequelizeClienteRepository,
    SequelizeProdutoRepository,
  );
  const createPedidoController = new CreateResourceController(createPedidoUseCase);
  return new PedidoControllerDecorator(createPedidoController);
}

module.exports = { makeCreatePedidoController };
