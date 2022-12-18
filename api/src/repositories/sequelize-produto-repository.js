const { Produto: ProdutoModel } = require('../database/models');

class SequelizeProdutoRepository {
  static async create(produto) {
    await ProdutoModel.create(produto);
  }

  static async existsBySku(sku) {
    const produto = await ProdutoModel.findByPk(sku);
    return produto !== null;
  }
}

module.exports = SequelizeProdutoRepository;
