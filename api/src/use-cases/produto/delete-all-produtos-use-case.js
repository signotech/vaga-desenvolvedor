class DeleteAllProdutosUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute() {
    await this.produtoRepository.deleteAll();
  }
}

module.exports = DeleteAllProdutosUseCase;
