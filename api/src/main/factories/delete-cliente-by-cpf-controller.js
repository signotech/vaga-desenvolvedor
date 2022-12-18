const DeleteClienteByCpfController = require('../../controllers/delete-cliente-by-cpf-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const DeleteClienteByCpf = require('../../use-cases/delete-cliente-by-cpf');

function makeDeleteClienteByCpfController() {
  const deleteAllClientesUseCase = new DeleteClienteByCpf(SequelizeClienteRepository);
  return new DeleteClienteByCpfController(deleteAllClientesUseCase);
}

module.exports = { makeDeleteClienteByCpfController };
