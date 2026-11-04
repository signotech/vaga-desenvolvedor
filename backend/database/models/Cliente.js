module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: { type: DataTypes.STRING(150), allowNull: false },
    cpf: { type: DataTypes.CHAR(11), unique: { msg: 'CPF já cadastrado.' } },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: { msg: 'E-mail já cadastrado.' } }
  }, { tableName: 'Clientes' });

  Cliente.associate = ({ Pedido }) => {
    Cliente.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
  };

  return Cliente;
};
