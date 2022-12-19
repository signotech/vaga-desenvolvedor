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
    status,
    dataPedido,
  }) {
    const storedPedidos = await PedidoModel.findAll({
      limit: porPagina,
      offset: porPagina * (pagina - 1),
      order: [[ordenarPor, ordem]],
      where: {
        status: { [Op.substring]: status },
        dataPedido: { [Op.startsWith]: dataPedido },
      },
      include: { all: true },
    });
    return storedPedidos.map((storedPedido) => {
      const cliente = new Cliente(storedPedido.cliente);
      const produtos = storedPedido.produtos.map((produto) => new Produto(produto));
      return new Pedido({
        codigoPedido: storedPedido.codigoPedido,
        status: storedPedido.status,
        dataPedido: storedPedido.dataPedido,
        cliente,
        produtos,
      });
    });
  }
}

module.exports = SequelizePedidoRepository;
