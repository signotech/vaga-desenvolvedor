class GetAllClientesUseCase {
  MIN_PAGE_NUMBER = 1;

  MIN_QTY_ITEMS = 1;

  SORTABLE_FIELDS = ['cpfCliente', 'nomeCliente', 'emailCliente'];

  VALID_ORDERS = ['asc', 'desc'];

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
    cpfCliente = '',
  } = {}) {
    const parsedPorPagina = Number(porPagina);
    const parsedPagina = Number(pagina);
    if (!this.isPorPaginaValid(parsedPorPagina)
        || !this.isPaginaValid(parsedPagina)
        || !this.isOrdenarPorValid(ordenarPor)
        || !this.isOrdemValid(ordem)) {
      return [];
    }
    return this.clienteRepository.getAll({
      porPagina: parsedPorPagina,
      pagina: parsedPagina,
      ordenarPor,
      ordem,
      nomeCliente,
      emailCliente,
      cpfCliente,
    });
  }

  isPorPaginaValid(porPagina) {
    return Number.isInteger(porPagina) && porPagina >= this.MIN_QTY_ITEMS;
  }

  isPaginaValid(pagina) {
    return Number.isInteger(pagina) && pagina >= this.MIN_PAGE_NUMBER;
  }

  isOrdenarPorValid(ordenarPor) {
    return this.SORTABLE_FIELDS.includes(ordenarPor);
  }

  isOrdemValid(ordem) {
    return this.VALID_ORDERS.includes(ordem.toLowerCase());
  }
}

module.exports = GetAllClientesUseCase;
