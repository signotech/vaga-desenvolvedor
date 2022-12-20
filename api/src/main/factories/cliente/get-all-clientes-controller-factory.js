const GetAllResourcesController = require('../../../controllers/get-all-resources-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const GetAllClientesUseCase = require('../../../use-cases/cliente/get-all-clientes-use-case');
const ClienteControllerDecorator = require('../../decorators/cliente-controller-decorator');

function makeGetAllClientesController() {
  const getAllClientesUseCase = new GetAllClientesUseCase(SequelizeClienteRepository);
  const getAllClientesController = new GetAllResourcesController(getAllClientesUseCase);
  return new ClienteControllerDecorator(getAllClientesController);
}

module.exports = { makeGetAllClientesController };
