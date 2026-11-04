'use strict';

const { Router } = require('express');
const clientController = require('../controllers/client.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { clientCreateSchema, clientUpdateSchema, bulkDeleteSchema } = require('../validators/schemas');

const router = Router();

// Todas as rotas de clientes exigem autenticação
router.use(authenticate);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Listar clientes com paginação, filtros e ordenação
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, enum: [10, 20, 50, 100], default: 20 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Pesquisar por nome, CPF ou e-mail
 *       - in: query
 *         name: dateFrom
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: dateTo
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [id, name, cpf, email, created_at] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [ASC, DESC] }
 *     responses:
 *       200:
 *         description: Lista paginada de clientes
 */
router.get('/', clientController.index.bind(clientController));

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Criar um novo cliente
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 */
router.post('/', validate(clientCreateSchema), clientController.store.bind(clientController));

/**
 * @swagger
 * /api/clients/bulk:
 *   delete:
 *     summary: Excluir clientes em lote
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 */
router.delete('/bulk', validate(bulkDeleteSchema), clientController.bulkDestroy.bind(clientController));

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obter um cliente pelo ID
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.get('/:id', clientController.show.bind(clientController));

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualizar um cliente
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 */
router.put('/:id', validate(clientUpdateSchema), clientController.update.bind(clientController));

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Excluir um cliente
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 */
router.delete('/:id', clientController.destroy.bind(clientController));

module.exports = router;
