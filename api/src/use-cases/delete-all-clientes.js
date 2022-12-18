class DeleteAllClientesUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute() {
    await this.clienteRepository.deleteAll();
  }
}

module.exports = DeleteAllClientesUseCase;
