const Produto = require('../../entities/produto');
const ResourceAlreadyExistsError = require('../../errors/resource-already-exists-error');

class CreateProdutoUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute({
    skuProduto,
    tituloProduto,
    preco,
    estoque,
  }) {
    const produto = new Produto({
      skuProduto,
      tituloProduto,
      preco,
      estoque,
    });
    const skuExists = await this.produtoRepository.existsBySku(skuProduto);
    if (skuExists) {
      throw new ResourceAlreadyExistsError('O SKU informado já existe');
    }
    await this.produtoRepository.create(produto);
    return produto;
  }
}

module.exports = CreateProdutoUseCase;
