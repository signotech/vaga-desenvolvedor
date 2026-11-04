'use strict';

const productService = require('../services/product.service');
const { successResponse } = require('../utils/helpers');

class ProductController {
  async index(req, res, next) {
    try {
      const result = await productService.list(req.query);
      return res.status(200).json(successResponse(result.data, result.meta));
    } catch (err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const product = await productService.getById(Number(req.params.id));
      return res.status(200).json(successResponse(product));
    } catch (err) {
      next(err);
    }
  }

  async store(req, res, next) {
    try {
      const product = await productService.create(req.body);
      return res.status(201).json(successResponse(product, null, 'Produto criado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.update(Number(req.params.id), req.body);
      return res.status(200).json(successResponse(product, null, 'Produto atualizado com sucesso'));
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const result = await productService.delete(Number(req.params.id));
      return res.status(200).json(successResponse(null, null, result.message));
    } catch (err) {
      next(err);
    }
  }

  async bulkDestroy(req, res, next) {
    try {
      const result = await productService.bulkDelete(req.body.ids);
      return res.status(200).json(successResponse(result, null, 'Operação de exclusão em massa concluída'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
