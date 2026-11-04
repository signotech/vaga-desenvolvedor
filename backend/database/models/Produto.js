module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    sku: { type: DataTypes.STRING(100), unique: { msg: 'SKU já cadastrado.' } },
    titulo: { type: DataTypes.STRING(100), allowNull: false },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, { tableName: 'Produtos' });

  Produto.associate = ({ PedidoItem }) => {
    Produto.hasMany(PedidoItem, { foreignKey: 'produto_id', as: 'itens' });
  };

  return Produto;
};
