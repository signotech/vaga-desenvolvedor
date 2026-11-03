
const { randomInt } = require('crypto');

const {
    Cliente,
    Produto,
    Pedido,
    ItemPedido,
    sequelize
} = require('../src/models');

// Gera dados fictícios para um pedido
function gerarPedido(clienteId, itens, dadosPersonalizados = {}) {
    return {
        codigo_pedido: randomInt(10000000, 100000000),
        cliente_id: clienteId,
        data_pedido: new Date(),
        status: 'Em Aberto',
        itens,
        ...dadosPersonalizados
    };
}

// Cria um pedido e seus itens dentro de uma transação
async function criarPedido(dadosPersonalizados = {}) {
    const { cliente_id, produtos, pedido = {} } = dadosPersonalizados;

    if (!Number.isInteger(Number(cliente_id)) || Number(cliente_id) <= 0) {
        throw new Error('Informe um ID de cliente válido.');
    }

    if (!Array.isArray(produtos) || produtos.length === 0) {
        throw new Error('Informe pelo menos um produto.');
    }

    const transaction = await sequelize.transaction();

    try {
        const cliente = await Cliente.findByPk(cliente_id, { transaction });

        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        const produtosEncontrados = [];
        const idsProdutos = new Set();

        for (const item of produtos) {
            const produtoId = Number(item.produto_id);
            const quantidade = Number(item.quantidade);

            if (
                !Number.isInteger(produtoId) ||
                produtoId <= 0 ||
                !Number.isInteger(quantidade) ||
                quantidade <= 0
            ) {
                throw new Error('Produto ou quantidade inválidos.');
            }

            if (idsProdutos.has(produtoId)) {
                throw new Error('Não repita produtos no mesmo pedido.');
            }

            idsProdutos.add(produtoId);

            const produto = await Produto.findByPk(produtoId, { transaction });

            if (!produto) {
                throw new Error(`Produto ${produtoId} não encontrado.`);
            }

            produtosEncontrados.push({
                produto_id: produto.id,
                quantidade,
                preco_unitario: produto.preco
            });
        }

        const dadosPedido = gerarPedido(
            cliente.id,
            produtosEncontrados,
            pedido
        );

        const novoPedido = await Pedido.create({
            codigo_pedido: dadosPedido.codigo_pedido,
            cliente_id: dadosPedido.cliente_id,
            data_pedido: dadosPedido.data_pedido,
            status: dadosPedido.status
        }, { transaction });

        await ItemPedido.bulkCreate(
            produtosEncontrados.map(item => ({
                ...item,
                pedido_id: novoPedido.id
            })),
            { transaction }
        );

        await transaction.commit();

        return novoPedido;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    gerarPedido,
    criarPedido
};

