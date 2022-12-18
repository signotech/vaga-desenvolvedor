const DeleteAllClientesController = require('../../controllers/delete-all-clientes-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const DeleteAllClientes = require('../../use-cases/delete-all-clientes');

function makeDeleteAllClientesController() {
  const deleteAllClientesUseCase = new DeleteAllClientes(SequelizeClienteRepository);
  return new DeleteAllClientesController(deleteAllClientesUseCase);
}

module.exports = { makeDeleteAllClientesController };
