module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    cpfCliente: {
      type: DataTypes.CHAR(11),
      primaryKey: true,
    },
    nomeCliente: DataTypes.STRING(150),
    emailCliente: DataTypes.STRING,
  }, {
    tableName: 'clientes',
    timestamps: false,
    underscored: true,
  });

  Cliente.associate = (models) => {
    Cliente.hasMany(models.Pedido, {
      foreignKey: 'codigoPedido',
      as: 'pedidos',
    });
  };

  return Cliente;
};
