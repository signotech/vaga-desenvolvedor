const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class GetProdutoBySkuUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute({ skuProduto }) {
    const produto = await this.produtoRepository.getBySku(skuProduto);
    if (produto === null) {
      throw new ResourceNotFoundError('Não foi encontrado um produto com o SKU informado');
    }
    return produto;
  }
}

module.exports = GetProdutoBySkuUseCase;
