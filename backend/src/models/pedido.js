'use strict';

const STATUS = ['Em Aberto', 'Pago', 'Cancelado'];

module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    'Pedido',
    {
      cliente_id: { type: DataTypes.INTEGER, allowNull: false },
      data_pedido: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Em Aberto',
        validate: { isIn: [STATUS] },
      },
      desconto: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    },
    { tableName: 'pedidos', underscored: true }
  );

  Pedido.STATUS = STATUS;

  Pedido.associate = ({ Cliente, PedidoItem }) => {
    Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    Pedido.hasMany(PedidoItem, { foreignKey: 'pedido_id', as: 'itens', onDelete: 'CASCADE' });
  };

  return Pedido;
};
