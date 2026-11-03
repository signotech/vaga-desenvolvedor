
const { Op } = require('sequelize');
const Cliente = require('../models/Cliente');

// Campos permitidos para filtros e ordenação
const camposPermitidos = [
    'id',
    'nome',
    'cpf',
    'email',
    'createdAt',
    'updatedAt'
];

// Validar CPF
function cpfValido(cpf) {
    return /^\d{11}$/.test(cpf);
}

// Validar e-mail
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CADASTRAR CLIENTE
exports.criarCliente = async (req, res) => {
    try {
        const { nome, cpf, email } = req.body;

        // Validar e-mail obrigatório
        if (
            typeof email !== 'string' ||
            !email.trim()
        ) {
            return res.status(400).json({
                mensagem: 'O e-mail é obrigatório.'
            });
        }

        // Validar formato do e-mail
        if (!emailValido(email.trim())) {
            return res.status(400).json({
                mensagem: 'Informe um e-mail válido.'
            });
        }

        // Validar nome
        if (
            nome !== undefined &&
            nome !== null &&
            typeof nome !== 'string'
        ) {
            return res.status(400).json({
                mensagem: 'O nome deve ser um texto.'
            });
        }

        // Validar CPF
        if (
            cpf !== undefined &&
            cpf !== null &&
            cpf !== ''
        ) {
            if (
                typeof cpf !== 'string' ||
                !cpfValido(cpf)
            ) {
                return res.status(400).json({
                    mensagem: 'O CPF deve conter exatamente 11 números.'
                });
            }
        }

        const cliente = await Cliente.create({
            nome: nome?.trim() || null,
            cpf: cpf || null,
            email: email.trim()
        });

        return res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso!',
            cliente
        });

    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar cliente.'
        });
    }
};

// LISTAR CLIENTES COM FILTROS, ORDENAÇÃO E PAGINAÇÃO
exports.listarClientes = async (req, res) => {
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

        // Validar campo de ordenação
        const campoOrdenacao = camposPermitidos.includes(ordenarPor)
            ? ordenarPor
            : 'id';

        // Permitir somente ASC ou DESC
        const direcao = ordem?.toUpperCase() === 'DESC'
            ? 'DESC'
            : 'ASC';

        const where = {};

        // Busca geral nos campos textuais
        if (busca && busca.trim()) {
            where[Op.or] = [
                { nome: { [Op.like]: `%${busca.trim()}%` } },
                { cpf: { [Op.like]: `%${busca.trim()}%` } },
                { email: { [Op.like]: `%${busca.trim()}%` } }
            ];
        }

        // Filtros individuais por campo
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

            } else {
                where[campo] = {
                    [Op.like]: `%${valor}%`
                };
            }
        }

        const resultado = await Cliente.findAndCountAll({
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
            clientes: resultado.rows
        });

    } catch (error) {
        console.error('Erro ao listar clientes:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao consultar clientes.'
        });
    }
};

// CONSULTAR CLIENTE POR ID
exports.buscarClientePorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        return res.status(200).json(cliente);

    } catch (error) {
        console.error('Erro ao buscar cliente:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao buscar cliente.'
        });
    }
};

// ATUALIZAR CLIENTE
exports.atualizarCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        const { nome, cpf, email } = req.body;

        const dadosAtualizados = {};

        // Validar nome
        if (nome !== undefined) {
            if (
                nome !== null &&
                typeof nome !== 'string'
            ) {
                return res.status(400).json({
                    mensagem: 'O nome deve ser um texto.'
                });
            }

            dadosAtualizados.nome = nome?.trim() || null;
        }

        // Validar CPF
        if (cpf !== undefined) {
            if (
                cpf !== null &&
                cpf !== '' &&
                (
                    typeof cpf !== 'string' ||
                    !cpfValido(cpf)
                )
            ) {
                return res.status(400).json({
                    mensagem: 'O CPF deve conter exatamente 11 números.'
                });
            }

            dadosAtualizados.cpf = cpf || null;
        }

        // Validar e-mail
        if (email !== undefined) {
            if (
                typeof email !== 'string' ||
                !email.trim()
            ) {
                return res.status(400).json({
                    mensagem: 'O e-mail não pode ser vazio.'
                });
            }

            if (!emailValido(email.trim())) {
                return res.status(400).json({
                    mensagem: 'Informe um e-mail válido.'
                });
            }

            dadosAtualizados.email = email.trim();
        }

        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                mensagem: 'Informe pelo menos um campo para atualizar.'
            });
        }

        await cliente.update(dadosAtualizados);

        return res.status(200).json({
            mensagem: 'Cliente atualizado com sucesso!',
            cliente
        });

    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar cliente.'
        });
    }
};

// EXCLUIR CLIENTE
exports.excluirCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensagem: 'Informe um ID válido.'
            });
        }

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        await cliente.destroy();

        return res.status(200).json({
            mensagem: 'Cliente excluído com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao excluir cliente:', error);

        if (
            error.name === 'SequelizeForeignKeyConstraintError' ||
            error.name === 'SequelizeDatabaseError'
        ) {
            return res.status(409).json({
                mensagem: 'Não é possível excluir este cliente porque existem registros relacionados a ele.'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir cliente.'
        });
    }
};


