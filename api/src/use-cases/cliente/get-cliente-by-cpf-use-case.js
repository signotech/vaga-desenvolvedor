const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class GetClienteByCpfUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute({ cpfCliente }) {
    const cliente = await this.clienteRepository.getByCpf(cpfCliente);
    if (cliente === null) {
      throw new ResourceNotFoundError('Não foi encontrado um cliente com o CPF informado');
    }
    return cliente;
  }
}

module.exports = GetClienteByCpfUseCase;
