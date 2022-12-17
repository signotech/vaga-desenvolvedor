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
    const parsedPorPagina = Number(porPagina);
    const parsedPagina = Number(pagina);
    if (!Number.isInteger(parsedPorPagina) || parsedPorPagina < 1
        || !Number.isInteger(parsedPagina) || parsedPagina < 1
        || !['cpfCliente', 'nomeCliente', 'emailCliente'].includes(ordenarPor)
        || !['asc', 'desc'].includes(ordem.toLowerCase())) {
      return [];
    }
    return this.clienteRepository.getAll({
      porPagina: parsedPorPagina,
      pagina: parsedPagina,
      ordenarPor,
      ordem,
      nomeCliente,
      emailCliente,
    });
  }
}

module.exports = GetAllClientes;
