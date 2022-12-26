const { Op } = require('sequelize');
const {
  Pedido: PedidoModel,
  PedidoProduto: PedidoProdutoModel,
} = require('../database/models');
const Cliente = require('../entities/cliente');
const Pedido = require('../entities/pedido');
const Produto = require('../entities/produto');

class SequelizePedidoRepository {
  static async create(pedido) {
    const pedidoData = {
      status: pedido.status,
      dataPedido: pedido.dataPedido,
      cpfCliente: pedido.cliente.cpfCliente,
    };
    const { codigoPedido } = await PedidoModel.create(pedidoData);
    await PedidoProdutoModel.bulkCreate(
      pedido.produtos.map(({ skuProduto }) => ({
        codigoPedido,
        skuProduto,
      })),
    );
    return codigoPedido;
  }

  static async getAll({
    porPagina,
    pagina,
    ordenarPor,
    ordem,
    codigoPedido,
    status,
    dataPedido,
  }) {
    const pedidos = await PedidoModel.findAll({
      limit: porPagina,
      offset: porPagina * (pagina - 1),
      order: [[ordenarPor, ordem]],
      where: {
        status: { [Op.substring]: status },
        dataPedido: { [Op.startsWith]: dataPedido },
        ...(codigoPedido !== undefined && { codigoPedido }),
      },
      include: { all: true },
    });
    return pedidos.map(this.mapToPedidoEntity);
  }

  static async getByCodigo(codigoPedido) {
    const pedido = await PedidoModel.findByPk(
      codigoPedido,
      { include: { all: true } },
    );
    if (pedido === null) {
      return null;
    }
    return this.mapToPedidoEntity(pedido);
  }

  static async getAllByCpfCliente(cpfCliente) {
    const pedidos = await PedidoModel.findAll({
      where: { cpfCliente },
      include: { all: true },
    });
    return pedidos.map(this.mapToPedidoEntity);
  }

  static async update({ codigoPedido, status }) {
    await PedidoModel.update(
      { status },
      { where: { codigoPedido } },
    );
  }

  static async deleteAll() {
    await PedidoModel.destroy({ where: {} });
  }

  static async deleteByCodigo(codigoPedido) {
    await PedidoModel.destroy({ where: { codigoPedido } });
  }

  static async existsByCodigo(codigoPedido) {
    const pedido = await PedidoModel.findByPk(codigoPedido);
    return pedido !== null;
  }

  static mapToPedidoEntity(pedido) {
    const cliente = new Cliente(pedido.cliente);
    const produtos = pedido.produtos.map((produto) => new Produto(produto));
    return new Pedido({
      codigoPedido: pedido.codigoPedido,
      status: pedido.status,
      dataPedido: pedido.dataPedido,
      cliente,
      produtos,
    });
  }
}

module.exports = SequelizePedidoRepository;
