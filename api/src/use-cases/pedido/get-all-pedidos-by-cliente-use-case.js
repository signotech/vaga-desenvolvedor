const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class GetAllPedidosByClienteUseCase {
  constructor(pedidoRepository, clienteRepository) {
    this.pedidoRepository = pedidoRepository;
    this.clienteRepository = clienteRepository;
  }

  async execute({ cpfCliente }) {
    const cpfExists = await this.clienteRepository.existsByCpf(cpfCliente);
    if (!cpfExists) {
      throw new ResourceNotFoundError('Não foi encontrado um cliente com o CPF informado');
    }
    return this.pedidoRepository.getAllByCpfCliente(cpfCliente);
  }
}

module.exports = GetAllPedidosByClienteUseCase;
