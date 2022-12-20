const Pedido = require('../../entities/pedido');
const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class UpdateClienteUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute({ codigoPedido, status }) {
    const pedido = await this.pedidoRepository.getByCodigo(codigoPedido);
    if (pedido === null) {
      throw new ResourceNotFoundError('Não foi encontrado um pedido com o código informado');
    }
    const updatedPedido = new Pedido({
      ...pedido,
      status,
    });
    await this.pedidoRepository.update(updatedPedido);
    return updatedPedido;
  }
}

module.exports = UpdateClienteUseCase;
