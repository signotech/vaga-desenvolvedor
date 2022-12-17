const { Op } = require('sequelize');
const { Cliente: ClienteModel } = require('../database/models');
const Cliente = require('../entities/cliente');

class SequelizeClienteRepository {
  static async create(cliente) {
    ClienteModel.create(cliente);
  }

  static async existsByCpf(cpf) {
    const cliente = await ClienteModel.findByPk(cpf);
    return cliente !== null;
  }

  static async getAll({
    porPagina,
    pagina,
    ordenarPor,
    ordem,
    nomeCliente,
    emailCliente,
  }) {
    try {
      const storedClientes = await ClienteModel.findAll({
        limit: porPagina,
        offset: porPagina * (pagina - 1),
        order: [[ordenarPor, ordem]],
        where: {
          nomeCliente: { [Op.substring]: nomeCliente },
          emailCliente: { [Op.substring]: emailCliente },
        },
      });
      return storedClientes.map((storedCliente) => new Cliente(storedCliente));
    } catch {
      return [];
    }
  }
}

module.exports = SequelizeClienteRepository;
