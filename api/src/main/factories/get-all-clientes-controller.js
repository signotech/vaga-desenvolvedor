const GetAllClientesController = require('../../controllers/get-all-clientes-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const GetAllClientesUseCase = require('../../use-cases/get-all-clientes-use-case');
const ClienteControllerDecorator = require('../decorators/cliente-controller-decorator');

function makeGetAllClientesController() {
  const getAllClientesUseCase = new GetAllClientesUseCase(SequelizeClienteRepository);
  const getAllClientesController = new GetAllClientesController(getAllClientesUseCase);
  return new ClienteControllerDecorator(getAllClientesController);
}

module.exports = { makeGetAllClientesController };
