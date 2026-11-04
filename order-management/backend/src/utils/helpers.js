'use strict';

/**
 * Formata um número como moeda brasileira (BRL).
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));
}

/**
 * Calcula o valor total de um pedido.
 * Usa aritmética inteira (centavos) para evitar problemas de ponto flutuante.
 *
 * @param {Array} items - Lista de itens no formato { quantity, unit_price }
 * @param {number} discountPercent - Percentual de desconto (0-100)
 * @returns {{ subtotal: string, discountAmount: string, total: string }}
 */
function calculateOrderTotal(items, discountPercent = 0) {
  if (!Array.isArray(items) || items.length === 0) {
    return { subtotal: '0.00', discountAmount: '0.00', total: '0.00' };
  }

  // Trabalha em centavos para evitar problemas de precisão de ponto flutuante
  let subtotalCents = 0;

  for (const item of items) {
    const qty = parseInt(item.quantity, 10);
    // Converte o preço para centavos (multiplica por 100 e arredonda)
    const priceCents = Math.round(parseFloat(item.unit_price) * 100);
    subtotalCents += qty * priceCents;
  }

  const discountRate = Math.min(Math.max(parseFloat(discountPercent) || 0, 0), 100);
  const discountCents = Math.round(subtotalCents * (discountRate / 100));
  const totalCents = subtotalCents - discountCents;

  return {
    subtotal: (subtotalCents / 100).toFixed(2),
    discountAmount: (discountCents / 100).toFixed(2),
    total: (totalCents / 100).toFixed(2),
  };
}

/**
 * Interpreta os parâmetros de consulta da paginação.
 */
function parsePagination(query) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = [10, 20, 50, 100].includes(parseInt(query.limit))
    ? parseInt(query.limit)
    : 20;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Cria os metadados padrão da resposta paginada.
 */
function paginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Cria uma resposta padronizada de sucesso da API.
 */
function successResponse(data, meta = null, message = null) {
  const response = { success: true, data };
  if (meta) response.meta = meta;
  if (message) response.message = message;
  return response;
}

/**
 * Cria uma resposta padronizada de erro da API.
 */
function errorResponse(message, errors = null, code = null) {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  if (code) response.code = code;
  return response;
}

/**
 * Valida e higieniza os campos de ordenação permitidos para evitar injeção de SQL.
 */
function validateSortField(field, allowedFields) {
  if (!field || !allowedFields.includes(field)) {
    return allowedFields[0];
  }
  return field;
}

/**
 * Valida a direção da ordenação (ASC/DESC).
 */
function validateSortOrder(order) {
  const normalized = (order || 'ASC').toUpperCase();
  return ['ASC', 'DESC'].includes(normalized) ? normalized : 'ASC';
}

function isValidDateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

module.exports = {
  formatCurrency,
  calculateOrderTotal,
  parsePagination,
  paginationMeta,
  successResponse,
  errorResponse,
  validateSortField,
  validateSortOrder,
  isValidDateOnly,
};
