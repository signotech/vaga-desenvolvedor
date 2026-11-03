
const { Produto } = require('../src/models');

// Gera dados fictícios para um produto
function gerarProduto(dadosPersonalizados = {}) {
    const numero = Date.now().toString().slice(-8);

    return {
        sku: `SKU-${numero}`,
        titulo: `Produto Teste ${numero}`,
        preco: 99.90,
        estoque: 10,
        ...dadosPersonalizados
    };
}

// Cria um produto no banco de dados
async function criarProduto(dadosPersonalizados = {}) {
    const dados = gerarProduto(dadosPersonalizados);

    return await Produto.create(dados);
}

module.exports = {
    gerarProduto,
    criarProduto
};
