const {
  Pedido: PedidoModel,
  PedidoProduto: PedidoProdutoModel,
} = require('../database/models');

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
}

module.exports = SequelizePedidoRepository;
