const { Op } = require('sequelize');
const { Produto: ProdutoModel } = require('../database/models');
const Produto = require('../entities/produto');

class SequelizeProdutoRepository {
  static async create(produto) {
    await ProdutoModel.create(produto);
  }

  static async existsBySku(sku) {
    const produto = await ProdutoModel.findByPk(sku);
    return produto !== null;
  }

  static async getAll({
    porPagina,
    pagina,
    ordenarPor,
    ordem,
    skuProduto,
    tituloProduto,
    preco,
    estoque,
  }) {
    const storedProdutos = await ProdutoModel.findAll({
      limit: porPagina,
      offset: porPagina * (pagina - 1),
      order: [[ordenarPor, ordem]],
      where: {
        skuProduto: { [Op.substring]: skuProduto },
        tituloProduto: { [Op.substring]: tituloProduto },
        ...(preco !== undefined && { preco }),
        ...(estoque !== undefined && { estoque }),
      },
    });
    return storedProdutos.map((storedProduto) => new Produto(storedProduto));
  }

  static async getBySku(sku) {
    const produto = await ProdutoModel.findByPk(sku);
    if (produto === null) {
      return null;
    }
    return new Produto(produto);
  }

  static async getAllBySku(skus) {
    const produtos = await ProdutoModel.findAll({
      where: {
        skuProduto: skus,
      },
    });
    return produtos.map((produto) => new Produto(produto));
  }

  static async update({
    skuProduto,
    tituloProduto,
    preco,
    estoque,
  }) {
    await ProdutoModel.update(
      { tituloProduto, preco, estoque },
      { where: { skuProduto } },
    );
  }

  static async deleteAll() {
    await ProdutoModel.destroy({ where: {} });
  }

  static async deleteBySku(skuProduto) {
    await ProdutoModel.destroy({ where: { skuProduto } });
  }
}

module.exports = SequelizeProdutoRepository;
