const UpdateClienteController = require('../../controllers/update-cliente-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const UpdateClienteUseCase = require('../../use-cases/update-cliente');
const ClienteControllerDecorator = require('../decorators/cliente-controller-decorator');

function makeUpdateClienteController() {
  const updateClienteUseCase = new UpdateClienteUseCase(SequelizeClienteRepository);
  const updateClienteController = new UpdateClienteController(updateClienteUseCase);
  return new ClienteControllerDecorator(updateClienteController);
}

module.exports = { makeUpdateClienteController };
