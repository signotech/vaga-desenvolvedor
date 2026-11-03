
'use strict';

const { QueryTypes } = require('sequelize');
const { gerarCliente } = require('../factories/clienteFactory');

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const emails = [
                'joao@teste.com',
                'maria@teste.com',
                'carlos@teste.com'
            ];

            const clientesExistentes = await queryInterface.sequelize.query(
                `SELECT email FROM clientes
                 WHERE email IN (:emails)`,
                {
                    replacements: { emails },
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            if (clientesExistentes.length > 0) {
                throw new Error(
                    'Já existem clientes com os e-mails reservados para este Seeder.'
                );
            }

            const agora = new Date();

            const clientes = [
                gerarCliente({
                    nome: 'João Silva',
                    cpf: '12345678901',
                    email: 'joao@teste.com'
                }),
                gerarCliente({
                    nome: 'Maria Oliveira',
                    cpf: '23456789012',
                    email: 'maria@teste.com'
                }),
                gerarCliente({
                    nome: 'Carlos Souza',
                    cpf: '34567890123',
                    email: 'carlos@teste.com'
                })
            ].map(cliente => ({
                ...cliente,
                createdAt: agora,
                updatedAt: agora
            }));

            await queryInterface.bulkInsert(
                'clientes',
                clientes,
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
            const clientes = await queryInterface.sequelize.query(
                `SELECT id FROM clientes
                 WHERE
                    (nome = 'João Silva' AND cpf = '12345678901' AND email = 'joao@teste.com')
                    OR
                    (nome = 'Maria Oliveira' AND cpf = '23456789012' AND email = 'maria@teste.com')
                    OR
                    (nome = 'Carlos Souza' AND cpf = '34567890123' AND email = 'carlos@teste.com')`,
                {
                    type: QueryTypes.SELECT,
                    transaction
                }
            );

            const ids = clientes.map(cliente => cliente.id);

            if (ids.length > 0) {
                await queryInterface.bulkDelete(
                    'clientes',
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


