class GetAllClientes {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute({
    porPagina = 20,
    pagina = 1,
    ordenarPor = 'nomeCliente',
    ordem = 'asc',
    nomeCliente = '',
    emailCliente = '',
  } = {}) {
    return this.clienteRepository.getAll({
      porPagina,
      pagina,
      ordenarPor,
      ordem,
      nomeCliente,
      emailCliente,
    });
  }
}

module.exports = GetAllClientes;
