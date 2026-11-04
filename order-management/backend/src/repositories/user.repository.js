'use strict';

const User = require('../models/User');
const Order = require('../models/Order');
const { Op } = require('sequelize');

class UserRepository {
  async findByEmail(email) {
    return User.scope('withPassword').findOne({ where: { email } });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async findAll() {
    return User.findAll({ order: [['name', 'ASC']] });
  }

  async findPublicByEmail(email, excludeId = null) {
    const where = { email };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    return User.findOne({ where });
  }

  async create(data) {
    return User.create(data);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  }

  async hasOrders(id) {
    return (await Order.count({ where: { user_id: id } })) > 0;
  }

  async countAdmins() {
    return User.count({ where: { role: 'ADMIN' } });
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
}

module.exports = new UserRepository();
