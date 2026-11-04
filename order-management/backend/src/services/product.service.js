'use strict';

const productRepository = require('../repositories/product.repository');
const { createError } = require('../middlewares/errorHandler.middleware');
const { paginationMeta } = require('../utils/helpers');

class ProductService {
  async list(query) {
    const {
      page = 1,
      limit = 20,
      search,
      sortBy,
      sortOrder,
      lowStock,
      priceMin,
      priceMax,
      stockMin,
      stockMax,
    } = query;
    for (const [field, value] of Object.entries({ priceMin, priceMax, stockMin, stockMax })) {
      if (value !== undefined && value !== '' && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
        throw createError(`Filtro ${field} deve ser um número não negativo`, 400, 'INVALID_FILTER');
      }
      if ([stockMin, stockMax].some((value) => value !== undefined && value !== '' && !Number.isInteger(Number(value)))) {
        throw createError('Filtros de estoque devem ser números inteiros', 400, 'INVALID_FILTER');
      }
    }
    if (priceMin !== undefined && priceMax !== undefined && Number(priceMin) > Number(priceMax)) {
      throw createError('Preço mínimo não pode superar o preço máximo', 400, 'INVALID_FILTER');
    }
    if (stockMin !== undefined && stockMax !== undefined && Number(stockMin) > Number(stockMax)) {
      throw createError('Estoque mínimo não pode superar o estoque máximo', 400, 'INVALID_FILTER');
    }
    const { products, total } = await productRepository.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      sortBy,
      sortOrder,
      lowStock,
      priceMin,
      priceMax,
      stockMin,
      stockMax,
    });
    return {
      data: products,
      meta: paginationMeta(total, Number(page), Number(limit)),
    };
  }

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw createError('Produto não encontrado', 404, 'PRODUCT_NOT_FOUND');
    return product;
  }

  async create(data) {
    const skuExists = await productRepository.findBySku(data.sku);
    if (skuExists) throw createError('SKU já cadastrado', 409, 'SKU_DUPLICATE');
    return productRepository.create(data);
  }

  async update(id, data) {
    const product = await productRepository.findById(id);
    if (!product) throw createError('Produto não encontrado', 404, 'PRODUCT_NOT_FOUND');

    if (data.sku) {
      const skuExists = await productRepository.findBySku(data.sku, id);
      if (skuExists) throw createError('SKU já cadastrado por outro produto', 409, 'SKU_DUPLICATE');
    }

    return productRepository.update(id, data);
  }

  async delete(id) {
    const product = await productRepository.findById(id);
    if (!product) throw createError('Produto não encontrado', 404, 'PRODUCT_NOT_FOUND');

    const hasItems = await productRepository.hasOrderItems(id);
    if (hasItems) {
      await productRepository.softDelete(id);
      return { action: 'archived', message: 'Produto arquivado pois está vinculado a pedidos' };
    }

    const p = await productRepository.findByIdAny(id);
    await p.destroy();
    return { action: 'deleted', message: 'Produto excluído com sucesso' };
  }

  async bulkDelete(ids) {
    return productRepository.bulkDelete(ids);
  }
}

module.exports = new ProductService();
