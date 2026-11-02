'use strict';

const sequelize = require('../config/database');

const Client = require('./client');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./order-item');
const User = require('./user');

Client.hasMany(Order, {
  foreignKey: 'clientId',
  as: 'orders',
  onDelete: 'RESTRICT',
});
Order.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client',
});

Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems',
  onDelete: 'RESTRICT',
});
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

module.exports = {
  sequelize,
  Client,
  Product,
  Order,
  OrderItem,
  User,
};
