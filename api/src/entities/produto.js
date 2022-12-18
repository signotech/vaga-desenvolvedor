const ValidationError = require('../errors/validation-error');

class Produto {
  constructor({
    skuProduto,
    tituloProduto,
    preco,
    estoque,
  }) {
    if (skuProduto === undefined) {
      throw new ValidationError('O campo skuProduto é obrigatório');
    }
    if (typeof skuProduto !== 'string') {
      throw new ValidationError('O campo skuProduto deve ser uma string');
    }
    if (skuProduto.length < 1) {
      throw new ValidationError('O campo skuProduto deve ter 1 ou mais caracteres');
    }
    if (tituloProduto === undefined) {
      throw new ValidationError('O campo tituloProduto é obrigatório');
    }
    if (typeof tituloProduto !== 'string') {
      throw new ValidationError('O campo tituloProduto deve ser uma string');
    }
    if (preco === undefined || preco === null) {
      throw new ValidationError('O campo preco é obrigatório');
    }
    const parsedPreco = Number(preco);
    if (Number.isNaN(parsedPreco)) {
      throw new ValidationError('O campo preco deve ser um número');
    }
    if (parsedPreco < 0) {
      throw new ValidationError('O campo preco não pode ser negativo');
    }
    if (estoque === undefined || estoque === null) {
      throw new ValidationError('O campo estoque é obrigatório');
    }
    const parsedEstoque = Number(estoque);
    if (!Number.isInteger(parsedEstoque)) {
      throw new ValidationError('O campo estoque deve ser um número inteiro');
    }
    if (parsedEstoque < 0) {
      throw new ValidationError('O campo estoque não pode ser negativo');
    }
    this.skuProduto = skuProduto;
    this.tituloProduto = tituloProduto;
    this.preco = parsedPreco;
    this.estoque = parsedEstoque;
  }
}

module.exports = Produto;
