module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    skuProduto: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    tituloProduto: DataTypes.STRING(100),
    preco: DataTypes.DECIMAL(10, 2),
    estoque: DataTypes.INTEGER,
  }, {
    tableName: 'produtos',
    timestamps: false,
    underscored: true,
  });

  return Produto;
};
