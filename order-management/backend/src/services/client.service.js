'use strict';

const clientRepository = require('../repositories/client.repository');
const { createError } = require('../middlewares/errorHandler.middleware');
const { paginationMeta, isValidDateOnly } = require('../utils/helpers');

class ClientService {
  async list(query) {
    const { page = 1, limit = 20, search, sortBy, sortOrder, dateFrom, dateTo } = query;
    for (const [field, value] of Object.entries({ dateFrom, dateTo })) {
      if (value !== undefined && value !== '' && !isValidDateOnly(value)) {
        throw createError(`Filtro ${field} deve ser uma data válida`, 400, 'INVALID_FILTER');
      }
    }
    if (dateFrom && dateTo && dateFrom > dateTo) {
      throw createError('Data inicial não pode ser posterior à data final', 400, 'INVALID_FILTER');
    }
    const { clients, total } = await clientRepository.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      sortBy,
      sortOrder,
      dateFrom,
      dateTo,
    });
    return {
      data: clients,
      meta: paginationMeta(total, Number(page), Number(limit)),
    };
  }

  async getById(id) {
    const client = await clientRepository.findById(id);
    if (!client) throw createError('Cliente não encontrado', 404, 'CLIENT_NOT_FOUND');
    return client;
  }

  async create(data) {
    // CPF uniqueness
    const cpfExists = await clientRepository.findByCpf(data.cpf);
    if (cpfExists) throw createError('CPF já cadastrado', 409, 'CPF_DUPLICATE');

    // Email uniqueness
    const emailExists = await clientRepository.findByEmail(data.email);
    if (emailExists) throw createError('E-mail já cadastrado', 409, 'EMAIL_DUPLICATE');

    return clientRepository.create(data);
  }

  async update(id, data) {
    const client = await clientRepository.findById(id);
    if (!client) throw createError('Cliente não encontrado', 404, 'CLIENT_NOT_FOUND');

    if (data.cpf) {
      const cpfExists = await clientRepository.findByCpf(data.cpf, id);
      if (cpfExists) throw createError('CPF já cadastrado por outro cliente', 409, 'CPF_DUPLICATE');
    }

    if (data.email) {
      const emailExists = await clientRepository.findByEmail(data.email, id);
      if (emailExists) throw createError('E-mail já cadastrado por outro cliente', 409, 'EMAIL_DUPLICATE');
    }

    return clientRepository.update(id, data);
  }

  async delete(id) {
    const client = await clientRepository.findById(id);
    if (!client) throw createError('Cliente não encontrado', 404, 'CLIENT_NOT_FOUND');

    const hasOrders = await clientRepository.hasOrders(id);
    if (hasOrders) {
      // Exclusão lógica — preserva os dados históricos
      await clientRepository.softDelete(id);
      return { action: 'archived', message: 'Cliente arquivado pois possui pedidos vinculados' };
    }

    await clientRepository.hardDelete(id);
    return { action: 'deleted', message: 'Cliente excluído com sucesso' };
  }

  async bulkDelete(ids) {
    return clientRepository.bulkDelete(ids);
  }
}

module.exports = new ClientService();
