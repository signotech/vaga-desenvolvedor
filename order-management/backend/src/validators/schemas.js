'use strict';

const { z } = require('zod');
const { validateCpf, cleanCpf } = require('../utils/cpfValidator');

// ─── Esquemas de Autenticação ───────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('E-mail inválido').toLowerCase().trim(),
  password: z.string().min(1, 'Senha obrigatória'),
});

const userCreateSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(150).trim(),
  email: z.string().email('E-mail inválido').toLowerCase().trim(),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  role: z.enum(['ADMIN', 'OPERATOR']).default('OPERATOR'),
});

const userUpdateSchema = z.object({
  name: z.string().min(2).max(150).trim().optional(),
  email: z.string().email('E-mail inválido').toLowerCase().trim().optional(),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres').optional(),
  role: z.enum(['ADMIN', 'OPERATOR']).optional(),
});

// ─── Esquemas de Clientes ───────────────────────────────────────────────────

const clientCreateSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(150).trim(),
  cpf: z
    .string()
    .transform((v) => cleanCpf(v))
    .refine((v) => v.length === 11, 'CPF deve ter 11 dígitos')
    .refine((v) => validateCpf(v), 'CPF inválido'),
  email: z.string().email('E-mail inválido').toLowerCase().trim(),
});

const clientUpdateSchema = clientCreateSchema.partial();

// ─── Esquemas de Produtos ────────────────────────────────────────────────────

const productCreateSchema = z.object({
  sku: z.string().min(1, 'SKU obrigatório').max(100).trim(),
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres').max(150).trim(),
  price: z
    .number({ invalid_type_error: 'Preço deve ser um número' })
    .positive('Preço deve ser maior que zero')
    .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais'),
  stock: z
    .number({ invalid_type_error: 'Estoque deve ser um número inteiro' })
    .int('Estoque deve ser um número inteiro')
    .min(0, 'Estoque não pode ser negativo'),
});

const productUpdateSchema = productCreateSchema.partial();

// ─── Esquemas de Pedidos ────────────────────────────────────────────────────

const orderItemSchema = z.object({
  product_id: z.number({ invalid_type_error: 'product_id deve ser numérico' }).positive().int(),
  quantity: z
    .number({ invalid_type_error: 'Quantidade deve ser numérica' })
    .int('Quantidade deve ser inteira')
    .min(1, 'Quantidade mínima é 1'),
});

const orderCreateSchema = z.object({
  client_id: z.number({ invalid_type_error: 'client_id deve ser numérico' }).positive().int(),
  order_date: z.string().datetime({ offset: true }).optional().or(z.date()).optional(),
  discount_percent: z.number().min(0).max(100).default(0),
  items: z
    .array(orderItemSchema)
    .min(1, 'Pedido deve ter pelo menos 1 item'),
});

const orderUpdateSchema = z.object({
  client_id: z.number().positive().int().optional(),
  order_date: z.string().datetime({ offset: true }).optional().or(z.date()).optional(),
  discount_percent: z.number().min(0).max(100).optional(),
  items: z.array(orderItemSchema).min(1).optional(),
});

const orderStatusSchema = z.object({
  status: z.enum(['OPEN', 'PAID', 'CANCELLED'], {
    errorMap: () => ({ message: 'Status deve ser OPEN, PAID ou CANCELLED' }),
  }),
});

// ─── Esquema de Exclusão em Lote ─────────────────────────────────────────────

const bulkDeleteSchema = z.object({
  ids: z
    .array(z.number().positive().int())
    .min(1, 'Informe pelo menos 1 ID para exclusão'),
});

// ─── Esquema de Paginação / Filtros ─────────────────────────────────────────

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().refine((v) => [10, 20, 50, 100].includes(v), {
    message: 'Limite deve ser 10, 20, 50 ou 100',
  }).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['ASC', 'DESC']).default('ASC'),
  search: z.string().optional(),
});

module.exports = {
  loginSchema,
  userCreateSchema,
  userUpdateSchema,
  clientCreateSchema,
  clientUpdateSchema,
  productCreateSchema,
  productUpdateSchema,
  orderCreateSchema,
  orderUpdateSchema,
  orderStatusSchema,
  bulkDeleteSchema,
  paginationSchema,
};
