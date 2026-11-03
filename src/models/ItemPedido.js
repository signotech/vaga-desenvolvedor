
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemPedido = sequelize.define('ItemPedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    tableName: 'itens_pedido',
    timestamps: true,

    indexes: [
        {
            unique: true,
            name: 'itens_pedido_pedido_produto_unique',
            fields: ['pedido_id', 'produto_id']
        }
    ]
});

module.exports = ItemPedido;


