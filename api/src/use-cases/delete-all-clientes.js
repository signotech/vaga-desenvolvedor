class DeleteAllClientes {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute() {
    await this.clienteRepository.deleteAll();
  }
}

module.exports = DeleteAllClientes;
