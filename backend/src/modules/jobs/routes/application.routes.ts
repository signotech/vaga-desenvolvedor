import { Router } from "express"
import { ApplicationController } from "../controllers/ApplicationController"

const routes = Router()
const controller = new ApplicationController()

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Gerenciamento de inscrições em vagas
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Criar uma nova inscrição
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApplicationDTO'
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       409:
 *         description: Candidato já inscrito nesta vaga
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este candidato já se inscreveu nesta vaga."
 *                 code:
 *                   type: string
 *                   example: "DUPLICATE_APPLICATION"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
routes.post("/", controller.create)

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
routes.get("/", controller.list)

/**
 * @swagger
 * /applications/check:
 *   get:
 *     summary: Verificar se candidato já se inscreveu em uma vaga
 *     tags: [Applications]
 *     parameters:
 *       - in: query
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do candidato
 *       - in: query
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Resultado da verificação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: Se a inscrição já existe
 *                   example: false
 *       400:
 *         description: Parâmetros obrigatórios não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "candidateId e jobId são obrigatórios."
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.get("/check", controller.checkExisting)

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Obter uma inscrição por ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     responses:
 *       200:
 *         description: Dados da inscrição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
routes.get("/:id", controller.show)

/**
 * @swagger
 * /applications/{id}:
 *   put:
 *     summary: Atualizar uma inscrição
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 description: Status da inscrição
 *                 example: false
 *     responses:
 *       200:
 *         description: Inscrição atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.put("/:id", controller.update)

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Excluir uma inscrição
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     responses:
 *       204:
 *         description: Inscrição excluída com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.delete("/:id", controller.delete)

export { routes as applicationRoutes }
