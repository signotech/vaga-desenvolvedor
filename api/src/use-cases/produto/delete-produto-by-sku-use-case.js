const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class DeleteProdutoBySkuUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute({ skuProduto }) {
    const skuExists = await this.produtoRepository.existsBySku(skuProduto);
    if (!skuExists) {
      throw new ResourceNotFoundError('Não foi encontrado um produto com o SKU informado');
    }
    await this.produtoRepository.deleteBySku(skuProduto);
  }
}

module.exports = DeleteProdutoBySkuUseCase;
