const DeleteAllResourcesController = require('../../controllers/delete-all-resources-controller');
const SequelizePedidoRepository = require('../../repositories/sequelize-pedido-repository');
const DeleteAllPedidosUseCase = require('../../use-cases/delete-all-pedidos-use-case');

function makeDeleteAllPedidosController() {
  const deleteAllPedidosUseCase = new DeleteAllPedidosUseCase(SequelizePedidoRepository);
  return new DeleteAllResourcesController(deleteAllPedidosUseCase);
}

module.exports = { makeDeleteAllPedidosController };
