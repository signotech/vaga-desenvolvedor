
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('produtos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            sku: {
                type: Sequelize.STRING(100),
                allowNull: true,
                unique: true
            },

            titulo: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            preco: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            },

            estoque: {
                type: Sequelize.INTEGER,
                allowNull: true
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
        await queryInterface.dropTable('produtos');
    }
};

