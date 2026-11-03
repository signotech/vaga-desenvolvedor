
'use strict';

const { QueryTypes } = require('sequelize');
const { gerarProduto } = require('../factories/produtoFactory');

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const skus = [
                'SKU-001',
                'SKU-002',
                'SKU-003',
                'SKU-004'
            ];

            const produtosExistentes = await queryInterface.sequelize.query(
                `SELECT sku FROM produtos
                 WHERE sku IN (:skus)`,
                {
                    replacements: { skus },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            if (produtosExistentes.length > 0) {
                throw new Error(
                    'Já existem produtos com os SKUs reservados para este Seeder.'
                );
            }

            const agora = new Date();

            const produtos = [
                gerarProduto({
                    sku: 'SKU-001',
                    titulo: 'Notebook Dell',
                    preco: 3500.00,
                    estoque: 10
                }),
                gerarProduto({
                    sku: 'SKU-002',
                    titulo: 'Monitor Samsung',
                    preco: 1200.00,
                    estoque: 15
                }),
                gerarProduto({
                    sku: 'SKU-003',
                    titulo: 'Teclado Logitech',
                    preco: 250.00,
                    estoque: 20
                }),
                gerarProduto({
                    sku: 'SKU-004',
                    titulo: 'Mouse Logitech',
                    preco: 120.00,
                    estoque: 30
                })
            ].map(produto => ({
                ...produto,
                createdAt: agora,
                updatedAt: agora
            }));

            await queryInterface.bulkInsert(
                'produtos',
                produtos,
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
            const skus = [
                'SKU-001',
                'SKU-002',
                'SKU-003',
                'SKU-004'
            ];

            const produtos = await queryInterface.sequelize.query(
                `SELECT id FROM produtos
                 WHERE sku IN (:skus)`,
                {
                    replacements: { skus },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            const ids = produtos.map(produto => produto.id);

            if (ids.length > 0) {
                await queryInterface.bulkDelete(
                    'produtos',
                    { id: ids },
                    { transaction }
                );
            }

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};


