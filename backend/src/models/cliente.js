'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    'Cliente',
    {
      nome: { type: DataTypes.STRING(150), allowNull: false },
      cpf: { type: DataTypes.CHAR(11), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    },
    { tableName: 'clientes', underscored: true }
  );

  Cliente.associate = ({ Pedido }) => {
    Cliente.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
  };

  return Cliente;
};
