const GetAllProdutosController = require('../../controllers/get-all-produtos-controller');
const SequelizeClienteRepository = require('../../repositories/sequelize-produto-repository');
const GetAllProdutosUseCase = require('../../use-cases/get-all-produtos-use-case');

function makeGetAllProdutosController() {
  const getAllProdutosUseCase = new GetAllProdutosUseCase(SequelizeClienteRepository);
  return new GetAllProdutosController(getAllProdutosUseCase);
}

module.exports = { makeGetAllProdutosController };
