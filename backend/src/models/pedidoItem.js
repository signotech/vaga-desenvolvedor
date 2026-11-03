'use strict';

module.exports = (sequelize, DataTypes) => {
  const PedidoItem = sequelize.define(
    'PedidoItem',
    {
      pedido_id: { type: DataTypes.INTEGER, allowNull: false },
      produto_id: { type: DataTypes.INTEGER, allowNull: false },
      quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    { tableName: 'pedido_itens', underscored: true }
  );

  PedidoItem.associate = ({ Pedido, Produto }) => {
    PedidoItem.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    PedidoItem.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
  };

  return PedidoItem;
};
