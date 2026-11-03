
'use strict';

const { QueryTypes } = require('sequelize');

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const agora = new Date();

            const codigos = [1001, 1002, 1003];

            // Verifica se os códigos já estão em uso.
            const pedidosExistentes = await queryInterface.sequelize.query(
                `SELECT codigo_pedido FROM pedidos
                 WHERE codigo_pedido IN (:codigos)`,
                {
                    replacements: { codigos },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            if (pedidosExistentes.length > 0) {
                throw new Error(
                    'Já existem pedidos com os códigos reservados para este Seeder.'
                );
            }

            // Busca os clientes pelos e-mails.
            const clientes = await queryInterface.sequelize.query(
                `SELECT id, email FROM clientes
                 WHERE email IN (:emails)`,
                {
                    replacements: {
                        emails: [
                            'joao@teste.com',
                            'maria@teste.com',
                            'carlos@teste.com'
                        ]
                    },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            // Busca os produtos pelos SKUs.
            const produtos = await queryInterface.sequelize.query(
                `SELECT id, sku, preco FROM produtos
                 WHERE sku IN (:skus)`,
                {
                    replacements: {
                        skus: [
                            'SKU-001',
                            'SKU-002',
                            'SKU-003',
                            'SKU-004'
                        ]
                    },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            const buscarCliente = email => {
                const encontrados = clientes.filter(
                    cliente => cliente.email === email
                );

                if (encontrados.length !== 1) {
                    throw new Error(
                        `Era esperado exatamente um cliente com e-mail ${email}.`
                    );
                }

                return encontrados[0];
            };

            const buscarProduto = sku => {
                const encontrados = produtos.filter(
                    produto => produto.sku === sku
                );

                if (encontrados.length !== 1) {
                    throw new Error(
                        `Era esperado exatamente um produto com SKU ${sku}.`
                    );
                }

                return encontrados[0];
            };

            const clienteJoao = buscarCliente('joao@teste.com');
            const clienteMaria = buscarCliente('maria@teste.com');
            const clienteCarlos = buscarCliente('carlos@teste.com');

            const notebook = buscarProduto('SKU-001');
            const monitor = buscarProduto('SKU-002');
            const teclado = buscarProduto('SKU-003');
            const mouse = buscarProduto('SKU-004');

            const pedidos = [
                {
                    codigo_pedido: 1001,
                    cliente_id: clienteJoao.id,
                    data_pedido: agora,
                    status: 'Em Aberto',
                    createdAt: agora,
                    updatedAt: agora
                },
                {
                    codigo_pedido: 1002,
                    cliente_id: clienteMaria.id,
                    data_pedido: agora,
                    status: 'Pago',
                    createdAt: agora,
                    updatedAt: agora
                },
                {
                    codigo_pedido: 1003,
                    cliente_id: clienteCarlos.id,
                    data_pedido: agora,
                    status: 'Em Aberto',
                    createdAt: agora,
                    updatedAt: agora
                }
            ];

            await queryInterface.bulkInsert(
                'pedidos',
                pedidos,
                { transaction }
            );

            // Recupera os IDs reais dos pedidos criados.
            const pedidosCriados = await queryInterface.sequelize.query(
                `SELECT id, codigo_pedido FROM pedidos
                 WHERE codigo_pedido IN (:codigos)`,
                {
                    replacements: { codigos },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            const buscarPedido = codigo => {
                const encontrados = pedidosCriados.filter(
                    pedido => Number(pedido.codigo_pedido) === codigo
                );

                if (encontrados.length !== 1) {
                    throw new Error(
                        `Não foi possível localizar o pedido ${codigo}.`
                    );
                }

                return encontrados[0];
            };

            const pedido1001 = buscarPedido(1001);
            const pedido1002 = buscarPedido(1002);
            const pedido1003 = buscarPedido(1003);

            const itens = [
                {
                    pedido_id: pedido1001.id,
                    produto_id: notebook.id,
                    quantidade: 1,
                    preco_unitario: notebook.preco,
                    createdAt: agora,
                    updatedAt: agora
                },
                {
                    pedido_id: pedido1001.id,
                    produto_id: monitor.id,
                    quantidade: 2,
                    preco_unitario: monitor.preco,
                    createdAt: agora,
                    updatedAt: agora
                },
                {
                    pedido_id: pedido1002.id,
                    produto_id: teclado.id,
                    quantidade: 1,
                    preco_unitario: teclado.preco,
                    createdAt: agora,
                    updatedAt: agora
                },
                {
                    pedido_id: pedido1003.id,
                    produto_id: mouse.id,
                    quantidade: 2,
                    preco_unitario: mouse.preco,
                    createdAt: agora,
                    updatedAt: agora
                }
            ];

            await queryInterface.bulkInsert(
                'itens_pedido',
                itens,
                { transaction }
            );

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const codigos = [1001, 1002, 1003];

            const pedidos = await queryInterface.sequelize.query(
                `SELECT id FROM pedidos
                 WHERE codigo_pedido IN (:codigos)`,
                {
                    replacements: { codigos },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            const ids = pedidos.map(pedido => pedido.id);

            if (ids.length > 0) {
                await queryInterface.bulkDelete(
                    'itens_pedido',
                    { pedido_id: ids },
                    { transaction }
                );
            }

            await queryInterface.bulkDelete(
                'pedidos',
                { codigo_pedido: codigos },
                { transaction }
            );

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};


