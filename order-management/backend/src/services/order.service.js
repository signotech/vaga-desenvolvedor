'use strict';

const sequelize = require('../models/index');
const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/product.repository');
const clientRepository = require('../repositories/client.repository');
const { createError } = require('../middlewares/errorHandler.middleware');
const { calculateOrderTotal, paginationMeta, isValidDateOnly } = require('../utils/helpers');

// Transições de status válidas
const STATUS_TRANSITIONS = {
  OPEN: ['PAID', 'CANCELLED'],
  PAID: ['CANCELLED'],
  CANCELLED: ['OPEN'], // Permite reabrir um pedido cancelado
};

class OrderService {
  async list(query) {
    const {
      page = 1,
      limit = 20,
      search,
      sortBy,
      sortOrder,
      status,
      clientId,
      productId,
      dateFrom,
      dateTo,
      totalMin,
      totalMax,
      discountMin,
      discountMax,
    } = query;
    for (const [field, value] of Object.entries({ totalMin, totalMax, discountMin, discountMax })) {
      if (value !== undefined && value !== '' && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
        throw createError(`Filtro ${field} deve ser um número não negativo`, 400, 'INVALID_FILTER');
      }
    }
    if (totalMin !== undefined && totalMax !== undefined && Number(totalMin) > Number(totalMax)) {
      throw createError('Total mínimo não pode superar o total máximo', 400, 'INVALID_FILTER');
    }
    if (discountMin !== undefined && discountMax !== undefined && Number(discountMin) > Number(discountMax)) {
      throw createError('Desconto mínimo não pode superar o desconto máximo', 400, 'INVALID_FILTER');
    }
    if ([discountMin, discountMax].some((value) => value !== undefined && value !== '' && Number(value) > 100)) {
      throw createError('Desconto deve estar entre 0 e 100', 400, 'INVALID_FILTER');
    }
    for (const [field, value] of Object.entries({ dateFrom, dateTo })) {
      if (value !== undefined && value !== '' && !isValidDateOnly(value)) {
        throw createError(`Filtro ${field} deve ser uma data válida`, 400, 'INVALID_FILTER');
      }
    }
    if (dateFrom && dateTo && dateFrom > dateTo) {
      throw createError('Data inicial não pode ser posterior à data final', 400, 'INVALID_FILTER');
    }
    const { orders, total } = await orderRepository.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      sortBy,
      sortOrder,
      status,
      clientId,
      productId,
      dateFrom,
      dateTo,
      totalMin,
      totalMax,
      discountMin,
      discountMax,
    });

    // Calcula os totais de cada pedido
    const ordersWithTotals = orders.map((o) => this._attachTotals(o));

    return {
      data: ordersWithTotals,
      meta: paginationMeta(total, Number(page), Number(limit)),
    };
  }

  async getById(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw createError('Pedido não encontrado', 404, 'ORDER_NOT_FOUND');
    return this._attachTotals(order);
  }

  /**
   * Cria um pedido com seus itens e valida a disponibilidade em estoque.
   * O estoque NÃO é reduzido na criação (somente quando o pedido é PAGO).
   */
  async create(data, userId) {
    const { client_id, order_date, discount_percent = 0, items } = data;

    // Valida se o cliente existe
    const client = await clientRepository.findById(client_id);
    if (!client) throw createError('Cliente não encontrado', 404, 'CLIENT_NOT_FOUND');

    // Valida os produtos e obtém os preços atuais
    const enrichedItems = await this._validateAndEnrichItems(items);

    const transaction = await sequelize.transaction();
    try {
      const orderData = {
        client_id,
        user_id: userId,
        order_date: order_date || new Date(),
        status: 'OPEN',
        discount_percent,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const order = await orderRepository.create(orderData, enrichedItems, transaction);
      await transaction.commit();

      return this.getById(order.id);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  /**
   * Atualiza um pedido. Permitido apenas para pedidos em aberto.
   */
  async update(id, data, userId) {
    const existing = await orderRepository.findById(id);
    if (!existing) throw createError('Pedido não encontrado', 404, 'ORDER_NOT_FOUND');

    if (existing.status !== 'OPEN') {
      throw createError('Apenas pedidos em aberto podem ser editados', 422, 'ORDER_NOT_EDITABLE');
    }

    const { client_id, order_date, discount_percent, items } = data;

    if (client_id) {
      const client = await clientRepository.findById(client_id);
      if (!client) throw createError('Cliente não encontrado', 404, 'CLIENT_NOT_FOUND');
    }

    let enrichedItems = null;
    if (items) {
      enrichedItems = await this._validateAndEnrichItems(items);
    }

    const transaction = await sequelize.transaction();
    try {
      const updateData = {};
      if (client_id !== undefined) updateData.client_id = client_id;
      if (order_date !== undefined) updateData.order_date = order_date;
      if (discount_percent !== undefined) updateData.discount_percent = discount_percent;
      updateData.updated_at = new Date();

      await orderRepository.update(id, updateData, enrichedItems, transaction);
      await transaction.commit();

      return this.getById(id);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  /**
   * Atualiza o status do pedido de acordo com as regras de negócio.
   * Gerencia as movimentações de estoque nas transições para PAGO/CANCELADO.
   */
  async updateStatus(id, newStatus) {
    const order = await orderRepository.findById(id);
    if (!order) throw createError('Pedido não encontrado', 404, 'ORDER_NOT_FOUND');

    const allowedTransitions = STATUS_TRANSITIONS[order.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      throw createError(
        `Transição de status inválida: ${order.status} → ${newStatus}. Permitido: ${allowedTransitions.join(', ')}`,
        422,
        'INVALID_STATUS_TRANSITION'
      );
    }

    const transaction = await sequelize.transaction();
    try {
      // Gerencia as movimentações de estoque
      if (newStatus === 'PAID' && order.status === 'OPEN') {
        // Reduz o estoque de cada item
        for (const item of order.items) {
          await productRepository.decrementStock(item.product_id, item.quantity, transaction);
        }
      } else if (newStatus === 'CANCELLED' && order.status === 'PAID') {
        // Restaura o estoque
        for (const item of order.items) {
          await productRepository.incrementStock(item.product_id, item.quantity, transaction);
        }
      }

      await orderRepository.updateStatus(id, newStatus, transaction);
      await transaction.commit();

      return this.getById(id);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async delete(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw createError('Pedido não encontrado', 404, 'ORDER_NOT_FOUND');

    if (order.status === 'PAID') {
      throw createError('Pedidos pagos não podem ser excluídos. Cancele o pedido primeiro.', 422, 'PAID_ORDER_DELETE');
    }

    await orderRepository.delete(id);
    return { message: 'Pedido excluído com sucesso' };
  }

  async bulkDelete(ids) {
    // Valida se nenhum pedido está pago
    const results = { deleted: [], cannotDelete: [] };
    for (const id of ids) {
      const order = await orderRepository.findById(id);
      if (!order) {
        results.cannotDelete.push({ id, reason: 'Pedido não encontrado' });
        continue;
      }
      if (order.status === 'PAID') {
        results.cannotDelete.push({ id, reason: 'Pedidos pagos não podem ser excluídos' });
        continue;
      }
      await orderRepository.delete(id);
      results.deleted.push({ id, action: 'deleted' });
    }
    return results;
  }

  async getDashboard() {
    return orderRepository.getDashboardStats();
  }

  /**
   * Valida os itens e obtém os preços unitários atuais dos produtos.
   */
  async _validateAndEnrichItems(items) {
    const enriched = [];

    for (const item of items) {
      const product = await productRepository.findById(item.product_id);
      if (!product) {
        throw createError(`Produto ID ${item.product_id} não encontrado`, 404, 'PRODUCT_NOT_FOUND');
      }

      enriched.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: parseFloat(product.price), // Registra o preço atual como valor histórico
      });
    }

    return enriched;
  }

  /**
   * Adiciona os totais calculados ao objeto do pedido.
   */
  _attachTotals(order) {
    const plain = order.toJSON ? order.toJSON() : order;
    if (plain.items && plain.items.length > 0) {
      const totals = calculateOrderTotal(plain.items, plain.discount_percent);
      plain.subtotal = totals.subtotal;
      plain.discount_amount = totals.discountAmount;
      plain.total = totals.total;
    } else {
      plain.subtotal = '0.00';
      plain.discount_amount = '0.00';
      plain.total = '0.00';
    }
    return plain;
  }
}

module.exports = new OrderService();
