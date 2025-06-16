import { Router } from "express"
import { JobController } from "../controllers/JobController"

const routes = Router()
const controller = new JobController()

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Gerenciamento de vagas de emprego
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Criar uma nova vaga
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobDTO'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
routes.post("/", controller.create)

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Listar todas as vagas
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
routes.get("/", controller.list)

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Obter uma vaga por ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Dados da vaga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
routes.get("/:id", controller.show)

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Atualizar uma vaga
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobDTO'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.put("/:id", controller.update)

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Excluir uma vaga
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       204:
 *         description: Vaga excluída com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.delete("/:id", controller.delete)

export { routes as jobRoutes }
