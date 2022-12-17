const { Cliente } = require('../database/models');

class SequelizeClienteRepository {
  static async create(cliente) {
    return Cliente.create(cliente);
  }

  static async existsByCpf(cpf) {
    const cliente = await Cliente.findByPk(cpf);
    return cliente !== null;
  }
}

module.exports = SequelizeClienteRepository;
