'use strict';

/**
 * Configura todas as associações entre os modelos do Sequelize.
 * Chame uma vez após inicializar todos os modelos.
 */
function setupAssociations() {
  const User = require('./User');
  const Client = require('./Client');
  const Product = require('./Product');
  const Order = require('./Order');
  const OrderItem = require('./OrderItem');

  // Usuário 1:N Pedidos
  User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Cliente 1:N Pedidos
  Client.hasMany(Order, { foreignKey: 'client_id', as: 'orders' });
  Order.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

  // Pedido 1:N Itens do Pedido
  Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
  OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

  // Produto 1:N Itens do Pedido
  Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
  OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Pedido N:N Produtos (por meio de Itens do Pedido)
  Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'order_id', otherKey: 'product_id', as: 'products' });
  Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id', otherKey: 'order_id', as: 'orders' });

  return { User, Client, Product, Order, OrderItem };
}

module.exports = setupAssociations;
