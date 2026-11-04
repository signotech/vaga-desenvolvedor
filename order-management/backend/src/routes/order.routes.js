'use strict';

const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { orderCreateSchema, orderUpdateSchema, orderStatusSchema, bulkDeleteSchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Listar pedidos com paginação, filtros e ordenação
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, enum: [10, 20, 50, 100], default: 20 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [OPEN, PAID, CANCELLED] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Pesquisar pelo nome do cliente
 *       - in: query
 *         name: clientId
 *         schema: { type: integer }
 *       - in: query
 *         name: productId
 *         schema: { type: integer }
 *       - in: query
 *         name: dateFrom
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: dateTo
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: totalMin
 *         schema: { type: number, minimum: 0 }
 *       - in: query
 *         name: totalMax
 *         schema: { type: number, minimum: 0 }
 *       - in: query
 *         name: discountMin
 *         schema: { type: number, minimum: 0, maximum: 100 }
 *       - in: query
 *         name: discountMax
 *         schema: { type: number, minimum: 0, maximum: 100 }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [id, order_date, status, discount_percent, client_name, total] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [ASC, DESC] }
 *     responses:
 *       200:
 *         description: Lista paginada de pedidos com preços históricos e totais calculados
 */
router.get('/', orderController.index.bind(orderController));
router.post('/', validate(orderCreateSchema), orderController.store.bind(orderController));
router.delete('/bulk', validate(bulkDeleteSchema), orderController.bulkDestroy.bind(orderController));
router.get('/:id', orderController.show.bind(orderController));
router.put('/:id', validate(orderUpdateSchema), orderController.update.bind(orderController));
router.patch('/:id/status', validate(orderStatusSchema), orderController.updateStatus.bind(orderController));
router.delete('/:id', orderController.destroy.bind(orderController));

module.exports = router;
