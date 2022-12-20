class DeleteAllPedidosUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute() {
    await this.pedidoRepository.deleteAll();
  }
}

module.exports = DeleteAllPedidosUseCase;
