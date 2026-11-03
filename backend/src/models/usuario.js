'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      nome: { type: DataTypes.STRING(150), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      senha_hash: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      tableName: 'usuarios',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['senha_hash'] },
      },
      scopes: {
        withSecret: { attributes: { include: ['senha_hash'] } },
      },
    },
  );

  return Usuario;
};
