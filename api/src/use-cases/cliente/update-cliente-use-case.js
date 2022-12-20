const Cliente = require('../../entities/cliente');
const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class UpdateClienteUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute({ cpfCliente, nomeCliente, emailCliente }) {
    const cpfExiste = await this.clienteRepository.existsByCpf(cpfCliente);
    if (!cpfExiste) {
      throw new ResourceNotFoundError('Não foi encontrado um cliente com o CPF informado');
    }
    const cliente = new Cliente({ cpfCliente, nomeCliente, emailCliente });
    await this.clienteRepository.update(cliente);
    return cliente;
  }
}

module.exports = UpdateClienteUseCase;
