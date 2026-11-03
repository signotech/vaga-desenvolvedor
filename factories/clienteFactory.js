
const { Cliente } = require('../src/models');

// Gera dados fictícios para um cliente
function gerarCliente(dadosPersonalizados = {}) {
    const numero = Date.now().toString().slice(-8);

    return {
        nome: `Cliente Teste ${numero}`,
        cpf: String(numero).padStart(11, '0'),
        email: `cliente${numero}@teste.com`,
        ...dadosPersonalizados
    };
}

// Cria um cliente no banco de dados
async function criarCliente(dadosPersonalizados = {}) {
    const dados = gerarCliente(dadosPersonalizados);

    return await Cliente.create(dados);
}

module.exports = {
    gerarCliente,
    criarCliente
};
