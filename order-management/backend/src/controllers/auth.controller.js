'use strict';

const authService = require('../services/auth.service');
const authConfig = require('../config/auth');
const { successResponse } = require('../utils/helpers');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      // Define o cookie HttpOnly
      res.cookie('authToken', result.token, authConfig.cookie);

      return res.status(200).json(
        successResponse({ user: result.user }, null, 'Login realizado com sucesso')
      );
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res) {
    res.clearCookie('authToken', {
      httpOnly: authConfig.cookie.httpOnly,
      secure: authConfig.cookie.secure,
      sameSite: authConfig.cookie.sameSite,
      path: '/',
    });
    return res.status(200).json(successResponse(null, null, 'Logout realizado com sucesso'));
  }

  async me(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return res.status(200).json(successResponse(user));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
