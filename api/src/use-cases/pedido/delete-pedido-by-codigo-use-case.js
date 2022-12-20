const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class DeletePedidoByCodigoUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute({ codigoPedido }) {
    const codigoExists = await this.pedidoRepository.existsByCodigo(codigoPedido);
    if (!codigoExists) {
      throw new ResourceNotFoundError('Não foi encontrado um pedido com o código informado');
    }
    await this.pedidoRepository.deleteByCodigo(codigoPedido);
  }
}

module.exports = DeletePedidoByCodigoUseCase;
