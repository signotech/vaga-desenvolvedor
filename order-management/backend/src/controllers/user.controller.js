'use strict';

const userService = require('../services/user.service');
const { successResponse } = require('../utils/helpers');

class UserController {
  async index(req, res, next) {
    try {
      return res.status(200).json(successResponse(await userService.list()));
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      return res.status(201).json(
        successResponse(await userService.create(req.body), null, 'Usuário criado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      return res.status(200).json(
        successResponse(await userService.update(Number(req.params.id), req.body), null, 'Usuário atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const result = await userService.delete(Number(req.params.id), req.user.id);
      return res.status(200).json(successResponse(null, null, result.message));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
