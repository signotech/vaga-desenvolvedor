const CreateResourceController = require('../../../controllers/create-resource-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const CreateClienteUseCase = require('../../../use-cases/cliente/create-cliente-use-case');
const ClienteControllerDecorator = require('../../decorators/cliente-controller-decorator');

function makeCreateClienteController() {
  const createClienteUseCase = new CreateClienteUseCase(SequelizeClienteRepository);
  const createClienteController = new CreateResourceController(createClienteUseCase);
  return new ClienteControllerDecorator(createClienteController);
}

module.exports = { makeCreateClienteController };
