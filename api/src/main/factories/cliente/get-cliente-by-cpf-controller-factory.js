const GetResourceByIdController = require('../../../controllers/get-resource-by-id-controller');
const SequelizeClienteRepository = require('../../../repositories/sequelize-cliente-repository');
const GetClienteByCpfUseCase = require('../../../use-cases/cliente/get-cliente-by-cpf-use-case');
const ClienteControllerDecorator = require('../../decorators/cliente-controller-decorator');

function makeGetClienteByCpfController() {
  const getClienteByCpfUseCase = new GetClienteByCpfUseCase(SequelizeClienteRepository);
  const getClienteByCpfController = new GetResourceByIdController(getClienteByCpfUseCase);
  return new ClienteControllerDecorator(getClienteByCpfController);
}

module.exports = { makeGetClienteByCpfController };
