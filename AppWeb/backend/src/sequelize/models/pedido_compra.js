const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cliente = require('./cliente');
const Produto = require('./produto');

const PedidoCompra = sequelize.define('pedido_compra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING
  }
});

PedidoCompra.belongsTo(Cliente, { foreignKey: 'cliente_id' });
PedidoCompra.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = PedidoCompra;
