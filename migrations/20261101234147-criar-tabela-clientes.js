
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('clientes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            nome: {
                type: Sequelize.STRING(150),
                allowNull: true
            },

            cpf: {
                type: Sequelize.CHAR(11),
                allowNull: true
            },

            email: {
                type: Sequelize.STRING(255),
                allowNull: false
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
        await queryInterface.dropTable('clientes');
    }
};






