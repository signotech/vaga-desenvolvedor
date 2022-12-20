const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class GetAllProdutosByPedidoUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute({ codigoPedido }) {
    const pedido = await this.pedidoRepository.getByCodigo(codigoPedido);
    if (pedido === null) {
      throw new ResourceNotFoundError('Não foi encontrado um pedido com o código informado');
    }
    return pedido.produtos;
  }
}

module.exports = GetAllProdutosByPedidoUseCase;
