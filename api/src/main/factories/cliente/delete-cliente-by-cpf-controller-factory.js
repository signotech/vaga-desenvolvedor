const DeleteResourceByIdController = require('../../../controllers/delete-resource-by-id-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const DeleteClienteByCpfUseCase = require('../../../use-cases/cliente/delete-cliente-by-cpf-use-case');

function makeDeleteClienteByCpfController() {
  const deleteClienteByCpfUseCase = new DeleteClienteByCpfUseCase(SequelizeClienteRepository);
  return new DeleteResourceByIdController(deleteClienteByCpfUseCase);
}

module.exports = { makeDeleteClienteByCpfController };
