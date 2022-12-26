class GetAllProdutosUseCase {
  MIN_PAGE_NUMBER = 1;

  MIN_QTY_ITEMS = 1;

  SORTABLE_FIELDS = ['skuProduto', 'tituloProduto', 'preco', 'estoque'];

  VALID_ORDERS = ['asc', 'desc'];

  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute({
    porPagina = 20,
    pagina = 1,
    ordenarPor = 'tituloProduto',
    ordem = 'asc',
    skuProduto = '',
    tituloProduto = '',
    preco,
    estoque,
  } = {}) {
    const parsedPorPagina = Number(porPagina);
    const parsedPagina = Number(pagina);
    if (!this.isPorPaginaValid(parsedPorPagina)
        || !this.isPaginaValid(parsedPagina)
        || !this.isOrdenarPorValid(ordenarPor)
        || !this.isOrdemValid(ordem)
        || !this.isNumericFilterValid(preco)
        || !this.isNumericFilterValid(estoque)) {
      return [];
    }
    return this.produtoRepository.getAll({
      porPagina: parsedPorPagina,
      pagina: parsedPagina,
      ordenarPor,
      ordem,
      skuProduto,
      tituloProduto,
      preco,
      estoque,
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

  // eslint-disable-next-line class-methods-use-this
  isNumericFilterValid(preco) {
    return preco === undefined || !Number.isNaN(Number(preco));
  }
}

module.exports = GetAllProdutosUseCase;
