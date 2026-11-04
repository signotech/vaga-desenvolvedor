const { STATUS_PEDIDO, TIPOS_DESCONTO } = require('../../constants');

// Subtotal e total são derivados dos itens; não ficam gravados (3FN).
const SUBTOTAL = `(SELECT COALESCE(SUM(item.quantidade * item.preco_unitario), 0)
  FROM PedidoItens AS item WHERE item.pedido_id = Pedido.id)`;
const TOTAL = `ROUND(${SUBTOTAL} - CASE Pedido.tipo_desconto
  WHEN 'PERCENTUAL' THEN ${SUBTOTAL} * Pedido.desconto / 100
  WHEN 'VALOR' THEN Pedido.desconto
  ELSE 0 END, 2)`;

module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    codigo_pedido: { type: DataTypes.INTEGER, allowNull: false, unique: { msg: 'Já existe um pedido com este código.' } },
    cliente_id: { type: DataTypes.INTEGER, allowNull: false },
    data_pedido: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM(...Object.values(STATUS_PEDIDO)), allowNull: false, defaultValue: STATUS_PEDIDO.ABERTO },
    tipo_desconto: { type: DataTypes.ENUM(...Object.values(TIPOS_DESCONTO)), allowNull: false, defaultValue: TIPOS_DESCONTO.NENHUM },
    desconto: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }
  }, {
    tableName: 'Pedidos',
    defaultScope: {
      attributes: { include: [[sequelize.literal(SUBTOTAL), 'subtotal'], [sequelize.literal(TOTAL), 'total']] }
    }
  });

  Pedido.SQL_TOTAL = TOTAL;

  Pedido.associate = ({ Cliente, PedidoItem }) => {
    Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    Pedido.hasMany(PedidoItem, { foreignKey: 'pedido_id', as: 'itens' });
  };

  return Pedido;
};
