module.exports = (sequelize, DataTypes) => {
  const PedidoItem = sequelize.define('PedidoItem', {
    pedido_id: { type: DataTypes.INTEGER, allowNull: false },
    produto_id: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    // Preço praticado na venda: não depende do preço atual do produto.
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subtotal: {
      type: DataTypes.VIRTUAL,
      get() { return Math.round(this.quantidade * this.preco_unitario * 100) / 100; }
    }
  }, { tableName: 'PedidoItens' });

  PedidoItem.associate = ({ Pedido, Produto }) => {
    PedidoItem.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    PedidoItem.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
  };

  return PedidoItem;
};
