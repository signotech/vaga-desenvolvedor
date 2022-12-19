module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    codigoPedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: DataTypes.STRING(100),
    dataPedido: DataTypes.DATE,
    cpfCliente: DataTypes.CHAR(11),
  }, {
    tableName: 'pedidos',
    timestamps: false,
    underscored: true,
  });

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, {
      foreignKey: 'cpfCliente',
      as: 'cliente',
    });
  };

  return Pedido;
};
