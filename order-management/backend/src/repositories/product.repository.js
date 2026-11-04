'use strict';

const { Op } = require('sequelize');
const Product = require('../models/Product');
const OrderItem = require('../models/OrderItem');
const { validateSortField, validateSortOrder } = require('../utils/helpers');

const ALLOWED_SORT_FIELDS = ['id', 'sku', 'title', 'price', 'stock', 'created_at'];
const LOW_STOCK_THRESHOLD = 5;

class ProductRepository {
  async findAll({
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
  }) {
    const offset = (page - 1) * limit;
    const field = validateSortField(sortBy, ALLOWED_SORT_FIELDS);
    const order = validateSortOrder(sortOrder);

    const where = { deleted_at: null };

    if (search) {
      const likeSearch = `%${search}%`;
      where[Op.or] = [
        { sku: { [Op.like]: likeSearch } },
        { title: { [Op.like]: likeSearch } },
      ];
    }

    if (lowStock === 'true' || lowStock === true) {
      where.stock = { [Op.lte]: LOW_STOCK_THRESHOLD };
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {};
      if (priceMin !== undefined && priceMin !== '') where.price[Op.gte] = Number(priceMin);
      if (priceMax !== undefined && priceMax !== '') where.price[Op.lte] = Number(priceMax);
    }

    if (stockMin !== undefined || stockMax !== undefined) {
      where.stock = where.stock || {};
      if (stockMin !== undefined && stockMin !== '') where.stock[Op.gte] = Number(stockMin);
      if (stockMax !== undefined && stockMax !== '') where.stock[Op.lte] = Number(stockMax);
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [[field, order]],
      limit,
      offset,
    });

    return { products: rows, total: count };
  }

  async findById(id) {
    return Product.findOne({ where: { id, deleted_at: null } });
  }

  async findByIdAny(id) {
    return Product.findByPk(id);
  }

  async findBySku(sku, excludeId = null) {
    const where = { sku, deleted_at: null };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    return Product.findOne({ where });
  }

  async findByIds(ids) {
    return Product.findAll({ where: { id: { [Op.in]: ids }, deleted_at: null } });
  }

  async create(data) {
    return Product.create(data);
  }

  async update(id, data) {
    const product = await this.findById(id);
    if (!product) return null;
    return product.update(data);
  }

  /**
   * Reduz o estoque de forma atômica. Lança um erro se o estoque ficar negativo.
   */
  async decrementStock(id, quantity, transaction) {
    const product = await Product.findOne({
      where: { id, deleted_at: null },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!product) throw new Error(`Produto ID ${id} não encontrado`);
    if (product.stock < quantity) {
      throw new Error(
        `Estoque insuficiente para "${product.title}". Disponível: ${product.stock}, solicitado: ${quantity}`
      );
    }

    return product.update({ stock: product.stock - quantity }, { transaction });
  }

  /**
   * Aumenta o estoque de forma atômica.
   */
  async incrementStock(id, quantity, transaction) {
    const product = await Product.findOne({
      where: { id, deleted_at: null },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!product) throw new Error(`Produto ID ${id} não encontrado`);
    return product.update({ stock: product.stock + quantity }, { transaction });
  }

  async hasOrderItems(id) {
    const count = await OrderItem.count({ where: { product_id: id } });
    return count > 0;
  }

  async softDelete(id) {
    const product = await this.findById(id);
    if (!product) return null;
    return product.update({ deleted_at: new Date() });
  }

  async bulkDelete(ids) {
    const deleted = [];
    const cannotDelete = [];

    for (const id of ids) {
      const product = await this.findById(id);
      if (!product) {
        cannotDelete.push({ id, reason: 'Produto não encontrado' });
        continue;
      }

      const hasItems = await this.hasOrderItems(id);
      if (hasItems) {
        await product.update({ deleted_at: new Date() });
        deleted.push({ id, action: 'archived', title: product.title });
      } else {
        await product.destroy();
        deleted.push({ id, action: 'deleted', title: product.title });
      }
    }

    return { deleted, cannotDelete };
  }

  get lowStockThreshold() {
    return LOW_STOCK_THRESHOLD;
  }
}

module.exports = new ProductRepository();
