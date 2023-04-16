const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');
const PedidoProduto = require('../models/PedidoProduto');

const connection = new Sequelize(dbConfig.development);

Cliente.init(connection);
Produto.init(connection);
Pedido.init(connection);
PedidoProduto.init(connection);

Cliente.hasMany(Pedido, { onDelete: 'CASCADE', foreignKey: 'id_cliente_pedido'});
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente_pedido'});

Pedido.belongsToMany(Produto, { 
    through: PedidoProduto, 
    foreignKey: 'codigo_pedido', 
    otherKey: 'id_produto'
});
Produto.belongsToMany(Pedido, { 
    through: PedidoProduto, 
    foreignKey: 'id_produto', 
    otherKey: 'codigo_pedido'
});

PedidoProduto.belongsTo(Pedido, { foreignKey: 'codigo_pedido' });
PedidoProduto.belongsTo(Produto, { foreignKey: 'id_produto' });

module.exports = connection;