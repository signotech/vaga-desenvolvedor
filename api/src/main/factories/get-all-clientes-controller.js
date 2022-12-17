const GetAllClientesController = require('../../controllers/get-all-clientes-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-cliente-repository');
const GetAllClientes = require('../../use-cases/get-all-clientes');
const ClienteControllerDecorator = require('../decorators/cliente-controller-decorator');

function makeGetAllClientesController() {
  const getAllClientesUseCase = new GetAllClientes(SequelizeClienteRepository);
  const getAllClientesController = new GetAllClientesController(getAllClientesUseCase);
  return new ClienteControllerDecorator(getAllClientesController);
}

module.exports = { makeGetAllClientesController };
