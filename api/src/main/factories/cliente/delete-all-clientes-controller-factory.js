const DeleteAllResourcesController = require('../../../controllers/delete-all-resources-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const DeleteAllClientesUseCase = require('../../../use-cases/cliente/delete-all-clientes-use-case');

function makeDeleteAllClientesController() {
  const deleteAllClientesUseCase = new DeleteAllClientesUseCase(SequelizeClienteRepository);
  return new DeleteAllResourcesController(deleteAllClientesUseCase);
}

module.exports = { makeDeleteAllClientesController };
