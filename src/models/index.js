
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Cliente = require('./Cliente');
const Produto = require('./Produto');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');

// Um cliente pode possuir vários pedidos
Cliente.hasMany(Pedido, {
    foreignKey: 'cliente_id',
    as: 'pedidos'
});

Pedido.belongsTo(Cliente, {
    foreignKey: 'cliente_id',
    as: 'cliente'
});

// Um pedido pode possuir vários itens
Pedido.hasMany(ItemPedido, {
    foreignKey: 'pedido_id',
    as: 'itens'
});

ItemPedido.belongsTo(Pedido, {
    foreignKey: 'pedido_id',
    as: 'pedido'
});

// Um produto pode aparecer em vários itens de pedidos
Produto.hasMany(ItemPedido, {
    foreignKey: 'produto_id',
    as: 'itensPedido'
});

ItemPedido.belongsTo(Produto, {
    foreignKey: 'produto_id',
    as: 'produto'
});

// Exporta os Models e a conexão com o banco
module.exports = {
    Cliente,
    Produto,
    Pedido,
    ItemPedido,
    sequelize,
    Sequelize
};
