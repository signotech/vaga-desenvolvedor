const { Cliente } = require('../database/models');

class SequelizeClienteRepository {
  async create(cliente) {
    return Cliente.create(cliente);
  }

  async existsByCpf(cpf) {
    const cliente = await Cliente.findByPk(cpf);
    return cliente !== null;
  }
}

module.exports = SequelizeClienteRepository;
