const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'Usuarios',
    defaultScope: { attributes: { exclude: ['senha'] } },
    hooks: {
      beforeSave: async usuario => {
        if (usuario.changed('senha')) usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  });

  Usuario.prototype.verificarSenha = function (senha) {
    return bcrypt.compare(String(senha ?? ''), this.senha);
  };

  return Usuario;
};
