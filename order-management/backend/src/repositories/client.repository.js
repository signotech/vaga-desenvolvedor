'use strict';

const { Op } = require('sequelize');
const Client = require('../models/Client');
const Order = require('../models/Order');
const { validateSortField, validateSortOrder } = require('../utils/helpers');

const ALLOWED_SORT_FIELDS = ['id', 'name', 'cpf', 'email', 'created_at'];

class ClientRepository {
  /**
   * Busca todos os clientes ativos (não excluídos), com paginação, pesquisa e ordenação.
   */
  async findAll({ page = 1, limit = 20, search, sortBy, sortOrder, dateFrom, dateTo }) {
    const offset = (page - 1) * limit;
    const field = validateSortField(sortBy, ALLOWED_SORT_FIELDS);
    const order = validateSortOrder(sortOrder);

    const where = { deleted_at: null };

    if (search) {
      const likeSearch = `%${search}%`;
      where[Op.or] = [
        { name: { [Op.like]: likeSearch } },
        { cpf: { [Op.like]: likeSearch } },
        { email: { [Op.like]: likeSearch } },
      ];
    }
    if (dateFrom || dateTo) {
      where.created_at = {};
      if (dateFrom) where.created_at[Op.gte] = new Date(`${dateFrom}T00:00:00`);
      if (dateTo) where.created_at[Op.lte] = new Date(`${dateTo}T23:59:59.999`);
    }

    const { count, rows } = await Client.findAndCountAll({
      where,
      order: [[field, order]],
      limit,
      offset,
    });

    return { clients: rows, total: count };
  }

  /**
   * Busca um cliente ativo pelo ID.
   */
  async findById(id) {
    return Client.findOne({ where: { id, deleted_at: null } });
  }

  /**
   * Busca um cliente pelo ID, incluindo os excluídos logicamente.
   */
  async findByIdAny(id) {
    return Client.findByPk(id);
  }

  /**
   * Busca um cliente pelo CPF (somente ativos).
   */
  async findByCpf(cpf, excludeId = null) {
    const where = { cpf, deleted_at: null };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    return Client.findOne({ where });
  }

  /**
   * Busca um cliente pelo e-mail (somente ativos).
   */
  async findByEmail(email, excludeId = null) {
    const where = { email, deleted_at: null };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    return Client.findOne({ where });
  }

  /**
   * Cria um novo cliente.
   */
  async create(data) {
    return Client.create(data);
  }

  /**
   * Atualiza um cliente pelo ID.
   */
  async update(id, data) {
    const client = await this.findById(id);
    if (!client) return null;
    return client.update(data);
  }

  /**
   * Verifica se o cliente possui pedidos.
   */
  async hasOrders(id) {
    const count = await Order.count({ where: { client_id: id } });
    return count > 0;
  }

  /**
   * Exclui logicamente um cliente (define deleted_at).
   */
  async softDelete(id) {
    const client = await this.findById(id);
    if (!client) return null;
    return client.update({ deleted_at: new Date() });
  }

  /**
   * Exclui permanentemente um cliente (somente se não houver pedidos).
   */
  async hardDelete(id) {
    const client = await this.findByIdAny(id);
    if (!client) return null;
    await client.destroy();
    return client;
  }

  /**
   * Exclui logicamente vários registros.
   * Retorna { deleted: [], cannotDelete: [] }
   */
  async bulkDelete(ids) {
    const deleted = [];
    const cannotDelete = [];

    for (const id of ids) {
      const client = await this.findById(id);
      if (!client) {
        cannotDelete.push({ id, reason: 'Cliente não encontrado' });
        continue;
      }

      const hasOrders = await this.hasOrders(id);
      if (hasOrders) {
        await client.update({ deleted_at: new Date() });
        deleted.push({ id, action: 'archived', name: client.name });
      } else {
        await client.destroy();
        deleted.push({ id, action: 'deleted', name: client.name });
      }
    }

    return { deleted, cannotDelete };
  }
}

module.exports = new ClientRepository();
