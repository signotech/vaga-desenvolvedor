const { Op } = require('sequelize');
const { Cliente: ClienteModel } = require('../database/models');
const Cliente = require('../entities/cliente');

class SequelizeClienteRepository {
  static async create(cliente) {
    await ClienteModel.create(cliente);
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
    cpfCliente,
  }) {
    const storedClientes = await ClienteModel.findAll({
      limit: porPagina,
      offset: porPagina * (pagina - 1),
      order: [[ordenarPor, ordem]],
      where: {
        nomeCliente: { [Op.substring]: nomeCliente },
        emailCliente: { [Op.substring]: emailCliente },
        cpfCliente: { [Op.substring]: cpfCliente },
      },
    });
    return storedClientes.map((storedCliente) => new Cliente(storedCliente));
  }

  static async getByCpf(cpfCliente) {
    const storedCliente = await ClienteModel.findByPk(cpfCliente);
    if (storedCliente === null) {
      return null;
    }
    return new Cliente(storedCliente);
  }

  static async update({ cpfCliente, nomeCliente, emailCliente }) {
    await ClienteModel.update(
      { nomeCliente, emailCliente },
      { where: { cpfCliente } },
    );
  }

  static async deleteAll() {
    await ClienteModel.destroy({ where: {} });
  }

  static async deleteByCpf(cpfCliente) {
    await ClienteModel.destroy({ where: { cpfCliente } });
  }
}

module.exports = SequelizeClienteRepository;
