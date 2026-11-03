
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    codigo_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    data_pedido: {
        type: DataTypes.DATE,
        allowNull: true
    },

    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Em Aberto',
        validate: {
            isIn: [['Em Aberto', 'Pago', 'Cancelado']]
        }
    }

}, {
    tableName: 'pedidos',
    timestamps: true
});

module.exports = Pedido;
