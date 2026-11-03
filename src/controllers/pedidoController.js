
const { Op } = require('sequelize');

const {
    Pedido,
    Cliente,
    Produto,
    ItemPedido,
    sequelize
} = require('../models');

const statusPermitidos = [
    'Em Aberto',
    'Pago',
    'Cancelado'
];

const camposPermitidos = [
    'id',
    'codigo_pedido',
    'cliente_id',
    'data_pedido',
    'status',
    'createdAt',
    'updatedAt'
];

// VALIDAR IDENTIFICADOR
function idValido(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}

// VALIDAR STATUS
function statusValido(status) {
    return statusPermitidos.includes(status);
}

// VALIDAR ITENS DO PEDIDO
function validarItens(itens) {
    if (!Array.isArray(itens) || itens.length === 0) {
        return 'O pedido deve possuir pelo menos um item.';
    }

    const produtosInformados = new Set();

    for (const item of itens) {

        // Verifica se cada item é um objeto válido
        if (
            !item ||
            typeof item !== 'object' ||
            Array.isArray(item)
        ) {
            return 'Cada item do pedido deve possuir dados válidos.';
        }

        if (!idValido(item.produto_id)) {
            return 'Todos os itens devem possuir um produto válido.';
        }

        if (
            !Number.isInteger(item.quantidade) ||
            item.quantidade < 1
        ) {
            return 'A quantidade de cada item deve ser um número inteiro maior que zero.';
        }

        const produtoId = Number(item.produto_id);

        if (produtosInformados.has(produtoId)) {
            return 'Não é permitido repetir o mesmo produto no pedido. Informe a quantidade em um único item.';
        }

        produtosInformados.add(produtoId);
    }

    return null;
}

// BUSCAR PRODUTOS E PREPARAR OS ITENS
async function prepararItens(itens, transaction) {
    const erroValidacao = validarItens(itens);

    if (erroValidacao) {
        const erro = new Error(erroValidacao);
        erro.statusCode = 400;
        throw erro;
    }

    const produtosIds = itens.map(
        item => Number(item.produto_id)
    );

    const produtos = await Produto.findAll({
        where: {
            id: {
                [Op.in]: produtosIds
            }
        },
        transaction
    });

    if (produtos.length !== produtosIds.length) {
        const erro = new Error(
            'Um ou mais produtos informados não foram encontrados.'
        );

        erro.statusCode = 404;
        throw erro;
    }

    const produtosPorId = new Map(
        produtos.map(produto => [produto.id, produto])
    );

    return itens.map(item => {
        const produto = produtosPorId.get(
            Number(item.produto_id)
        );

        if (
            produto.preco === null ||
            produto.preco === undefined ||
            !Number.isFinite(Number(produto.preco)) ||
            Number(produto.preco) < 0
        ) {
            const erro = new Error(
                `O produto ${produto.titulo} não possui um preço válido cadastrado.`
            );

            erro.statusCode = 400;
            throw erro;
        }

        return {
            produto_id: produto.id,
            quantidade: item.quantidade,
            preco_unitario: Number(produto.preco)
        };
    });
}

// INCLUIR RELACIONAMENTOS NAS CONSULTAS
const incluirRelacionamentos = [
    {
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'cpf', 'email']
    },
    {
        model: ItemPedido,
        as: 'itens',
        include: [
            {
                model: Produto,
                as: 'produto',
                attributes: ['id', 'sku', 'titulo', 'preco']
            }
        ]
    }
];

// CADASTRAR PEDIDO
exports.criarPedido = async (req, res) => {
    try {
        const {
            codigo_pedido,
            cliente_id,
            data_pedido,
            status,
            itens
        } = req.body;

        if (
            !Number.isInteger(codigo_pedido) ||
            codigo_pedido < 1
        ) {
            return res.status(400).json({
                mensagem: 'O código do pedido deve ser um número inteiro positivo.'
            });
        }

        if (!idValido(cliente_id)) {
            return res.status(400).json({
                mensagem: 'Informe um cliente válido.'
            });
        }

        if (
            status !== undefined &&
            !statusValido(status)
        ) {
            return res.status(400).json({
                mensagem: 'Status inválido. Utilize Em Aberto, Pago ou Cancelado.'
            });
        }

        if (
            data_pedido !== undefined &&
            data_pedido !== null &&
            !Number.isFinite(Date.parse(data_pedido))
        ) {
            return res.status(400).json({
                mensagem: 'Informe uma data de pedido válida.'
            });
        }

        const erroItens = validarItens(itens);

        if (erroItens) {
            return res.status(400).json({
                mensagem: erroItens
            });
        }

        const pedido = await sequelize.transaction(async transaction => {
            const cliente = await Cliente.findByPk(cliente_id, {
                transaction
            });

            if (!cliente) {
                const erro = new Error('Cliente não encontrado.');
                erro.statusCode = 404;
                throw erro;
            }

            const itensPreparados = await prepararItens(
                itens,
                transaction
            );

            const novoPedido = await Pedido.create({
                codigo_pedido,
                cliente_id: Number(cliente_id),
                data_pedido: data_pedido || null,
                status: status || 'Em Aberto'
            }, {
                transaction
            });

            const itensParaCriar = itensPreparados.map(item => ({
                ...item,
                pedido_id: novoPedido.id
            }));

            await ItemPedido.bulkCreate(itensParaCriar, {
                transaction
            });

            return novoPedido;
        });

        const pedidoCompleto = await Pedido.findByPk(pedido.id, {
            include: incluirRelacionamentos
        });

        return res.status(201).json({
            mensagem: 'Pedido cadastrado com sucesso!',
            pedido: pedidoCompleto
        });

    } catch (error) {
        console.error('Erro ao cadastrar pedido:', error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                mensagem: error.message
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                mensagem: 'Já existe um pedido cadastrado com esse código.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar pedido.'
        });
    }
};

// LISTAR PEDIDOS COM FILTROS, ORDENAÇÃO E PAGINAÇÃO
exports.listarPedidos = async (req, res) => {
    try {
        const pagina = Math.max(
            parseInt(req.query.pagina, 10) || 1,
            1
        );

        const limite = Math.min(
            Math.max(
                parseInt(req.query.limite, 10) || 20,
                1
            ),
            100
        );

        const offset = (pagina - 1) * limite;

        const {
            busca,
            ordenarPor,
            ordem
        } = req.query;

        const campoOrdenacao = camposPermitidos.includes(ordenarPor)
            ? ordenarPor
            : 'id';

        const direcao = ordem?.toUpperCase() === 'DESC'
            ? 'DESC'
            : 'ASC';

        const where = {};

        if (busca && busca.trim()) {
            where[Op.or] = [
                {
                    status: {
                        [Op.like]: `%${busca.trim()}%`
                    }
                },
                {
                    codigo_pedido: {
                        [Op.like]: `%${busca.trim()}%`
                    }
                }
            ];
        }

        for (const campo of camposPermitidos) {
            const valor = req.query[campo];

            if (valor === undefined || valor === '') {
                continue;
            }

            if (
                campo === 'id' ||
                campo === 'codigo_pedido' ||
                campo === 'cliente_id'
            ) {
                const numero = Number(valor);

                if (!Number.isInteger(numero) || numero < 1) {
                    return res.status(400).json({
                        mensagem: `O filtro ${campo} deve ser um número inteiro positivo.`
                    });
                }

                where[campo] = numero;

            } else if (campo === 'status') {
                if (!statusValido(valor)) {
                    return res.status(400).json({
                        mensagem: 'Status de filtro inválido.'
                    });
                }

                where.status = valor;

            } else {
                where[campo] = {
                    [Op.like]: `%${valor}%`
                };
            }
        }

        const resultado = await Pedido.findAndCountAll({
            where,
            include: incluirRelacionamentos,
            distinct: true,
            order: [[campoOrdenacao, direcao]],
            limit: limite,
            offset
        });

        return res.status(200).json({
            total: resultado.count,
            pagina,
            limite,
            totalPaginas: Math.ceil(resultado.count / limite),
            pedidos: resultado.rows
        });

    } catch (error) {
        console.error('Erro ao listar pedidos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao consultar pedidos.'
        });
    }
};

// CONSULTAR PEDIDO POR ID
exports.buscarPedidoPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!idValido(id)) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const pedido = await Pedido.findByPk(id, {
            include: incluirRelacionamentos
        });

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        return res.status(200).json(pedido);

    } catch (error) {
        console.error('Erro ao buscar pedido:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao buscar pedido.'
        });
    }
};

// ATUALIZAR PEDIDO
exports.atualizarPedido = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!idValido(id)) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const {
            codigo_pedido,
            cliente_id,
            data_pedido,
            status,
            itens
        } = req.body;

        if (
            codigo_pedido !== undefined &&
            (
                !Number.isInteger(codigo_pedido) ||
                codigo_pedido < 1
            )
        ) {
            return res.status(400).json({
                mensagem: 'O código do pedido deve ser um número inteiro positivo.'
            });
        }

        if (
            cliente_id !== undefined &&
            !idValido(cliente_id)
        ) {
            return res.status(400).json({
                mensagem: 'Informe um cliente válido.'
            });
        }

        if (
            status !== undefined &&
            !statusValido(status)
        ) {
            return res.status(400).json({
                mensagem: 'Status inválido. Utilize Em Aberto, Pago ou Cancelado.'
            });
        }

        if (
            data_pedido !== undefined &&
            data_pedido !== null &&
            !Number.isFinite(Date.parse(data_pedido))
        ) {
            return res.status(400).json({
                mensagem: 'Informe uma data de pedido válida.'
            });
        }

        if (itens !== undefined) {
            const erroItens = validarItens(itens);

            if (erroItens) {
                return res.status(400).json({
                    mensagem: erroItens
                });
            }
        }

        await sequelize.transaction(async transaction => {
            const pedido = await Pedido.findByPk(id, {
                transaction
            });

            if (!pedido) {
                const erro = new Error('Pedido não encontrado.');
                erro.statusCode = 404;
                throw erro;
            }

            const dadosAtualizados = {};

            if (codigo_pedido !== undefined) {
                dadosAtualizados.codigo_pedido = codigo_pedido;
            }

            if (cliente_id !== undefined) {
                const cliente = await Cliente.findByPk(cliente_id, {
                    transaction
                });

                if (!cliente) {
                    const erro = new Error('Cliente não encontrado.');
                    erro.statusCode = 404;
                    throw erro;
                }

                dadosAtualizados.cliente_id = Number(cliente_id);
            }

            if (data_pedido !== undefined) {
                dadosAtualizados.data_pedido = data_pedido;
            }

            if (status !== undefined) {
                dadosAtualizados.status = status;
            }

            await pedido.update(dadosAtualizados, {
                transaction
            });

            // Se novos itens forem enviados,
            // substitui os itens anteriores do pedido.
            if (itens !== undefined) {
                const itensPreparados = await prepararItens(
                    itens,
                    transaction
                );

                await ItemPedido.destroy({
                    where: {
                        pedido_id: pedido.id
                    },
                    transaction
                });

                const itensParaCriar = itensPreparados.map(item => ({
                    ...item,
                    pedido_id: pedido.id
                }));

                await ItemPedido.bulkCreate(itensParaCriar, {
                    transaction
                });
            }
        });

        const pedidoAtualizado = await Pedido.findByPk(id, {
            include: incluirRelacionamentos
        });

        return res.status(200).json({
            mensagem: 'Pedido atualizado com sucesso!',
            pedido: pedidoAtualizado
        });

    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                mensagem: error.message
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                mensagem: 'Já existe um pedido cadastrado com esse código.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar pedido.'
        });
    }
};

// EXCLUIR PEDIDO
exports.excluirPedido = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!idValido(id)) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        // Os itens relacionados são excluídos
        // pela regra ON DELETE CASCADE da migration.
        await pedido.destroy();

        return res.status(200).json({
            mensagem: 'Pedido excluído com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao excluir pedido:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir pedido.'
        });
    }
};

