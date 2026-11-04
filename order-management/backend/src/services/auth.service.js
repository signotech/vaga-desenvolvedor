'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const userRepository = require('../repositories/user.repository');
const { createError } = require('../middlewares/errorHandler.middleware');

class AuthService {
  /**
   * Autentica as credenciais do usuário e retorna um token JWT.
   */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw createError('E-mail ou senha inválidos', 401, 'INVALID_CREDENTIALS');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw createError('E-mail ou senha inválidos', 401, 'INVALID_CREDENTIALS');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Retorna o perfil do usuário autenticado.
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw createError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    return user;
  }
}

module.exports = new AuthService();
