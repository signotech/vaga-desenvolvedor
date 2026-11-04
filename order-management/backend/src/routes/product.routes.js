'use strict';

const { Router } = require('express');
const productController = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { productCreateSchema, productUpdateSchema, bulkDeleteSchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar produtos com paginação, filtros e ordenação
 *     tags: [Products]
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
 *         description: Pesquisar por SKU ou nome do produto
 *       - in: query
 *         name: priceMin
 *         schema: { type: number, minimum: 0 }
 *       - in: query
 *         name: priceMax
 *         schema: { type: number, minimum: 0 }
 *       - in: query
 *         name: stockMin
 *         schema: { type: integer, minimum: 0 }
 *       - in: query
 *         name: stockMax
 *         schema: { type: integer, minimum: 0 }
 *       - in: query
 *         name: lowStock
 *         schema: { type: boolean }
 *         description: Filtrar produtos com estoque <= 5
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [id, sku, title, price, stock, created_at] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [ASC, DESC] }
 *     responses:
 *       200:
 *         description: Lista paginada de produtos
 */
router.get('/', productController.index.bind(productController));
router.post('/', authorize('ADMIN', 'OPERATOR'), validate(productCreateSchema), productController.store.bind(productController));
router.delete('/bulk', authorize('ADMIN', 'OPERATOR'), validate(bulkDeleteSchema), productController.bulkDestroy.bind(productController));
router.get('/:id', productController.show.bind(productController));
router.put('/:id', authorize('ADMIN', 'OPERATOR'), validate(productUpdateSchema), productController.update.bind(productController));
router.delete('/:id', authorize('ADMIN', 'OPERATOR'), productController.destroy.bind(productController));

module.exports = router;
