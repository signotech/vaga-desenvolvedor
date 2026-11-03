
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('pedidos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            codigo_pedido: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },

            cliente_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clientes',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },

            data_pedido: {
                type: Sequelize.DATE,
                allowNull: true
            },

            status: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'Em Aberto'
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('pedidos');
    }
};


