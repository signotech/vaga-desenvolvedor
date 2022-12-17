const CreateClienteController = require("../../controllers/create-cliente-controller");
const SequelizeClienteRepository = require("../../repositories/sequelize-cliente-repository");
const CreateCliente = require("../../use-cases/create-cliente");
const ClienteControllerDecorator = require("../decorators/cliente-controller-decorator");

function makeCreateClienteController() {
  const clienteRepository = new SequelizeClienteRepository();
  const createClienteUseCase = new CreateCliente(clienteRepository);
  const createClienteController = new CreateClienteController(createClienteUseCase);
  return new ClienteControllerDecorator(createClienteController);
}

module.exports = { makeCreateClienteController };
