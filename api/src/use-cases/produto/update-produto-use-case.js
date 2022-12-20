const Produto = require('../../entities/produto');
const ResourceNotFoundError = require('../../errors/resource-not-found-error');

class UpdateProdutoUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute({
    skuProduto,
    tituloProduto,
    preco,
    estoque,
  }) {
    const skuExists = await this.produtoRepository.existsBySku(skuProduto);
    if (!skuExists) {
      throw new ResourceNotFoundError('Não foi encontrado um produto com o SKU informado');
    }
    const produto = new Produto({
      skuProduto,
      tituloProduto,
      preco,
      estoque,
    });
    await this.produtoRepository.update(produto);
    return produto;
  }
}

module.exports = UpdateProdutoUseCase;
