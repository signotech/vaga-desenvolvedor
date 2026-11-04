'use strict';

const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
const userRepository = require('../repositories/user.repository');
const { createError } = require('../middlewares/errorHandler.middleware');

class UserService {
  async list() {
    const users = await userRepository.findAll();
    return users.map((user) => this._publicUser(user));
  }

  async create(data) {
    if (await userRepository.findPublicByEmail(data.email)) {
      throw createError('E-mail já cadastrado', 409, 'EMAIL_DUPLICATE');
    }
    const userData = { ...data };
    delete userData.password;
    const password_hash = await bcrypt.hash(data.password, authConfig.bcryptRounds);
    return this._publicUser(await userRepository.create({ ...userData, password_hash }));
  }

  async update(id, data) {
    const user = await userRepository.findById(id);
    if (!user) throw createError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    if (data.email && await userRepository.findPublicByEmail(data.email, id)) {
      throw createError('E-mail já cadastrado por outro usuário', 409, 'EMAIL_DUPLICATE');
    }

    const updateData = { ...data };
    if (user.role === 'ADMIN' && updateData.role === 'OPERATOR' && await userRepository.countAdmins() <= 1) {
      throw createError('O sistema precisa manter pelo menos um administrador', 422, 'LAST_ADMIN');
    }
    if (updateData.password) {
      updateData.password_hash = await bcrypt.hash(updateData.password, authConfig.bcryptRounds);
    }
    delete updateData.password;
    return this._publicUser(await userRepository.update(id, updateData));
  }

  async delete(id, actorId) {
    const user = await userRepository.findById(id);
    if (!user) throw createError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    if (Number(id) === Number(actorId)) {
      throw createError('Não é possível excluir o próprio usuário', 422, 'CANNOT_DELETE_SELF');
    }
    if (user.role === 'ADMIN' && await userRepository.countAdmins() <= 1) {
      throw createError('O sistema precisa manter pelo menos um administrador', 422, 'LAST_ADMIN');
    }
    if (await userRepository.hasOrders(id)) {
      throw createError('Usuário possui pedidos históricos e não pode ser excluído', 422, 'USER_HAS_ORDERS');
    }
    await userRepository.delete(id);
    return { message: 'Usuário excluído com sucesso' };
  }

  _publicUser(user) {
    const safeUser = user.toJSON();
    delete safeUser.password_hash;
    delete safeUser.password;
    return safeUser;
  }
}

module.exports = new UserService();
