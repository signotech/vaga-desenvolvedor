const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class DeleteClienteByCpfUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute({ cpfCliente }) {
    const cpfExists = await this.clienteRepository.existsByCpf(cpfCliente);
    if (!cpfExists) {
      throw new ResourceNotFoundError('Não foi encontrado um cliente com o CPF informado');
    }
    await this.clienteRepository.deleteByCpf(cpfCliente);
  }
}

module.exports = DeleteClienteByCpfUseCase;
