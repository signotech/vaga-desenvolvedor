const Cliente = require('../../entities/cliente');
const ResourceAlreadyExistsError = require('../../errors/resource-already-exists-error');

class CreateClienteUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute({ cpfCliente, nomeCliente, emailCliente }) {
    const cliente = new Cliente({ cpfCliente, nomeCliente, emailCliente });
    const cpfExists = await this.clienteRepository.existsByCpf(cpfCliente);
    if (cpfExists) {
      throw new ResourceAlreadyExistsError('O CPF informado já existe');
    }
    await this.clienteRepository.create(cliente);
    return cliente;
  }
}

module.exports = CreateClienteUseCase;
