module.exports = (sequelize, DataTypes) => {
  const PedidoProduto = sequelize.define('PedidoProduto', {
    codigoPedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    skuProduto: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
  }, {
    tableName: 'pedidos_produtos',
    timestamps: false,
    underscored: true,
  });

  PedidoProduto.associate = (models) => {
    models.Pedido.belongsToMany(models.Produto, {
      as: 'produtos',
      through: PedidoProduto,
      foreignKey: 'codigoPedido',
      otherKey: 'skuProduto',
    });

    models.Produto.belongsToMany(models.Pedido, {
      as: 'pedidos',
      through: PedidoProduto,
      foreignKey: 'skuProduto',
      otherKey: 'codigoPedido',
    });
  };

  return PedidoProduto;
};
