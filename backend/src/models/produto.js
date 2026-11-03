'use strict';

module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    'Produto',
    {
      sku: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      titulo: { type: DataTypes.STRING(100), allowNull: false },
      preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    { tableName: 'produtos', underscored: true }
  );

  Produto.associate = ({ PedidoItem }) => {
    Produto.hasMany(PedidoItem, { foreignKey: 'produto_id', as: 'itens' });
  };

  return Produto;
};
