'use strict';

const clientService = require('../services/client.service');
const { successResponse } = require('../utils/helpers');

class ClientController {
  async index(req, res, next) {
    try {
      const result = await clientService.list(req.query);
      return res.status(200).json(successResponse(result.data, result.meta));
    } catch (err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const client = await clientService.getById(Number(req.params.id));
      return res.status(200).json(successResponse(client));
    } catch (err) {
      next(err);
    }
  }

  async store(req, res, next) {
    try {
      const client = await clientService.create(req.body);
      return res.status(201).json(successResponse(client, null, 'Cliente criado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const client = await clientService.update(Number(req.params.id), req.body);
      return res.status(200).json(successResponse(client, null, 'Cliente atualizado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const result = await clientService.delete(Number(req.params.id));
      return res.status(200).json(successResponse(null, null, result.message));
    } catch (err) {
      next(err);
    }
  }

  async bulkDestroy(req, res, next) {
    try {
      const result = await clientService.bulkDelete(req.body.ids);
      return res.status(200).json(successResponse(result, null, 'Operação de exclusão em massa concluída'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ClientController();
