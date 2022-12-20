const UpdateResourceController = require('../../../controllers/update-resource-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const UpdateClienteUseCase = require('../../../use-cases/cliente/update-cliente-use-case');
const ClienteControllerDecorator = require('../../decorators/cliente-controller-decorator');

function makeUpdateClienteController() {
  const updateClienteUseCase = new UpdateClienteUseCase(SequelizeClienteRepository);
  const updateClienteController = new UpdateResourceController(updateClienteUseCase);
  return new ClienteControllerDecorator(updateClienteController);
}

module.exports = { makeUpdateClienteController };
