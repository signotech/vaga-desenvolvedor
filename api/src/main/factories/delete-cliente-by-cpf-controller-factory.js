const DeleteClienteByCpfController = require('../../controllers/delete-cliente-by-cpf-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const DeleteClienteByCpfUseCase = require('../../use-cases/delete-cliente-by-cpf-use-case');

function makeDeleteClienteByCpfController() {
  const deleteClienteByCpfUseCase = new DeleteClienteByCpfUseCase(SequelizeClienteRepository);
  return new DeleteClienteByCpfController(deleteClienteByCpfUseCase);
}

module.exports = { makeDeleteClienteByCpfController };
