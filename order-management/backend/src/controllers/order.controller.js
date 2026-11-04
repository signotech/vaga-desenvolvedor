'use strict';

const orderService = require('../services/order.service');
const { successResponse } = require('../utils/helpers');

class OrderController {
  async index(req, res, next) {
    try {
      const result = await orderService.list(req.query);
      return res.status(200).json(successResponse(result.data, result.meta));
    } catch (err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const order = await orderService.getById(Number(req.params.id));
      return res.status(200).json(successResponse(order));
    } catch (err) {
      next(err);
    }
  }

  async store(req, res, next) {
    try {
      const order = await orderService.create(req.body, req.user.id);
      return res.status(201).json(successResponse(order, null, 'Pedido criado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const order = await orderService.update(Number(req.params.id), req.body, req.user.id);
      return res.status(200).json(successResponse(order, null, 'Pedido atualizado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const order = await orderService.updateStatus(Number(req.params.id), req.body.status);
      return res.status(200).json(successResponse(order, null, 'Status do pedido atualizado'));
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const result = await orderService.delete(Number(req.params.id));
      return res.status(200).json(successResponse(null, null, result.message));
    } catch (err) {
      next(err);
    }
  }

  async bulkDestroy(req, res, next) {
    try {
      const result = await orderService.bulkDelete(req.body.ids);
      return res.status(200).json(successResponse(result, null, 'Operação de exclusão em massa concluída'));
    } catch (err) {
      next(err);
    }
  }

  async dashboard(req, res, next) {
    try {
      const stats = await orderService.getDashboard();
      return res.status(200).json(successResponse(stats));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
