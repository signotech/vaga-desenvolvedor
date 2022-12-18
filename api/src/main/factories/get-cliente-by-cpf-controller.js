const GetClienteByCpfController = require('../../controllers/get-cliente-by-cpf-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const GetClienteByCpfUseCase = require('../../use-cases/get-cliente-by-cpf-use-case');
const ClienteControllerDecorator = require('../decorators/cliente-controller-decorator');

function makeGetClienteByCpfController() {
  const getClienteByCpfUseCase = new GetClienteByCpfUseCase(SequelizeClienteRepository);
  const getClienteByCpfController = new GetClienteByCpfController(getClienteByCpfUseCase);
  return new ClienteControllerDecorator(getClienteByCpfController);
}

module.exports = { makeGetClienteByCpfController };
