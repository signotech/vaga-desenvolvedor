'use strict';

const { Router } = require('express');
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { userCreateSchema, userUpdateSchema } = require('../validators/schemas');

const router = Router();

router.use(authenticate, authorize('ADMIN'));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuários (somente ADMIN)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuários sem hashes de senha
 *   post:
 *     summary: Criar um usuário (somente ADMIN)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *               role: { type: string, enum: [ADMIN, OPERATOR] }
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.get('/', userController.index.bind(userController));
router.post('/', validate(userCreateSchema), userController.store.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar um usuário (somente ADMIN)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *   delete:
 *     summary: Excluir um usuário (somente ADMIN)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuário excluído
 *       422:
 *         description: Pedidos históricos, autoexclusão ou último administrador impedem a exclusão
 */
router.put('/:id', validate(userUpdateSchema), userController.update.bind(userController));
router.delete('/:id', userController.destroy.bind(userController));

module.exports = router;
