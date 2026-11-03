
const { Op } = require('sequelize');
const Produto = require('../models/Produto');

const camposPermitidos = [
    'id',
    'sku',
    'titulo',
    'preco',
    'estoque',
    'createdAt',
    'updatedAt'
];

// Validar preço
function precoValido(preco) {
    return (
        typeof preco === 'number' &&
        Number.isFinite(preco) &&
        preco >= 0
    );
}

// Validar estoque
function estoqueValido(estoque) {
    return (
        Number.isInteger(estoque) &&
        estoque >= 0
    );
}

// CADASTRAR PRODUTO
exports.criarProduto = async (req, res) => {
    try {
        const { sku, titulo, preco, estoque } = req.body;

        if (
            typeof titulo !== 'string' ||
            !titulo.trim()
        ) {
            return res.status(400).json({
                mensagem: 'O título do produto é obrigatório.'
            });
        }

        if (
            sku !== undefined &&
            sku !== null &&
            typeof sku !== 'string'
        ) {
            return res.status(400).json({
                mensagem: 'O SKU deve ser um texto.'
            });
        }

        if (
            preco !== undefined &&
            preco !== null &&
            !precoValido(preco)
        ) {
            return res.status(400).json({
                mensagem: 'O preço deve ser um número maior ou igual a zero.'
            });
        }

        if (
            estoque !== undefined &&
            estoque !== null &&
            !estoqueValido(estoque)
        ) {
            return res.status(400).json({
                mensagem: 'O estoque deve ser um número inteiro maior ou igual a zero.'
            });
        }

        const produto = await Produto.create({
            sku: sku?.trim() || null,
            titulo: titulo.trim(),
            preco: preco ?? null,
            estoque: estoque ?? null
        });

        return res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso!',
            produto
        });

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                mensagem: 'Já existe um produto cadastrado com esse SKU.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar produto.'
        });
    }
};

// LISTAR PRODUTOS COM FILTROS, ORDENAÇÃO E PAGINAÇÃO
exports.listarProdutos = async (req, res) => {
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

        // Busca geral por SKU e título
        if (busca && busca.trim()) {
            where[Op.or] = [
                { sku: { [Op.like]: `%${busca.trim()}%` } },
                { titulo: { [Op.like]: `%${busca.trim()}%` } }
            ];
        }

        // Filtros individuais
        for (const campo of camposPermitidos) {
            const valor = req.query[campo];

            if (valor === undefined || valor === '') {
                continue;
            }

            if (campo === 'id') {
                const id = Number(valor);

                if (!Number.isInteger(id) || id < 1) {
                    return res.status(400).json({
                        mensagem: 'O filtro de ID deve ser um número inteiro positivo.'
                    });
                }

                where.id = id;

            } else if (campo === 'preco' || campo === 'estoque') {
                const numero = Number(valor);

                if (!Number.isFinite(numero)) {
                    return res.status(400).json({
                        mensagem: `O filtro ${campo} deve ser numérico.`
                    });
                }

                where[campo] = numero;

            } else {
                where[campo] = {
                    [Op.like]: `%${valor}%`
                };
            }
        }

        const resultado = await Produto.findAndCountAll({
            where,
            order: [[campoOrdenacao, direcao]],
            limit: limite,
            offset
        });

        return res.status(200).json({
            total: resultado.count,
            pagina,
            limite,
            totalPaginas: Math.ceil(resultado.count / limite),
            produtos: resultado.rows
        });

    } catch (error) {
        console.error('Erro ao listar produtos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao consultar produtos.'
        });
    }
};

// CONSULTAR PRODUTO POR ID
exports.buscarProdutoPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error('Erro ao buscar produto:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao buscar produto.'
        });
    }
};

// ATUALIZAR PRODUTO
exports.atualizarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const { sku, titulo, preco, estoque } = req.body;
        const dadosAtualizados = {};

        if (sku !== undefined) {
            if (
                sku !== null &&
                typeof sku !== 'string'
            ) {
                return res.status(400).json({
                    mensagem: 'O SKU deve ser um texto.'
                });
            }

            dadosAtualizados.sku = sku?.trim() || null;
        }

        if (titulo !== undefined) {
            if (
                typeof titulo !== 'string' ||
                !titulo.trim()
            ) {
                return res.status(400).json({
                    mensagem: 'O título não pode ser vazio.'
                });
            }

            dadosAtualizados.titulo = titulo.trim();
        }

        if (preco !== undefined) {
            if (
                preco !== null &&
                !precoValido(preco)
            ) {
                return res.status(400).json({
                    mensagem: 'O preço deve ser um número maior ou igual a zero.'
                });
            }

            dadosAtualizados.preco = preco;
        }

        if (estoque !== undefined) {
            if (
                estoque !== null &&
                !estoqueValido(estoque)
            ) {
                return res.status(400).json({
                    mensagem: 'O estoque deve ser um número inteiro maior ou igual a zero.'
                });
            }

            dadosAtualizados.estoque = estoque;
        }

        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                mensagem: 'Informe pelo menos um campo para atualizar.'
            });
        }

        await produto.update(dadosAtualizados);

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso!',
            produto
        });

    } catch (error) {
        console.error('Erro ao atualizar produto:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                mensagem: 'Já existe um produto cadastrado com esse SKU.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar produto.'
        });
    }
};

// EXCLUIR PRODUTO
exports.excluirProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        await produto.destroy();

        return res.status(200).json({
            mensagem: 'Produto excluído com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao excluir produto:', error);

        if (
            error.name === 'SequelizeForeignKeyConstraintError' ||
            error.name === 'SequelizeDatabaseError'
        ) {
            return res.status(409).json({
                mensagem: 'Não é possível excluir este produto porque ele está vinculado a itens de pedidos.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir produto.'
        });
    }
};
