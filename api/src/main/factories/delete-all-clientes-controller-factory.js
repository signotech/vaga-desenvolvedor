const DeleteAllClientesController = require('../../controllers/delete-all-clientes-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const DeleteAllClientesUseCase = require('../../use-cases/delete-all-clientes-use-case');

function makeDeleteAllClientesController() {
  const deleteAllClientesUseCase = new DeleteAllClientesUseCase(SequelizeClienteRepository);
  return new DeleteAllClientesController(deleteAllClientesUseCase);
}

module.exports = { makeDeleteAllClientesController };
