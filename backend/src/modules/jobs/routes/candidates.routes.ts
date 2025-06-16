import { Router } from "express"
import { CandidateController } from "../controllers/CandidateController"

const routes = Router()
const controller = new CandidateController()

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: Gerenciamento de candidatos
 */

/**
 * @swagger
 * /candidates:
 *   post:
 *     summary: Criar um novo candidato
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCandidateDTO'
 *     responses:
 *       201:
 *         description: Candidato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       200:
 *         description: Candidato já existe (retorna candidato existente)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
routes.post("/", controller.create)

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Listar todos os candidatos
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: Lista de candidatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 */
routes.get("/", controller.list)

/**
 * @swagger
 * /candidates/{id}:
 *   get:
 *     summary: Obter um candidato por ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do candidato
 *     responses:
 *       200:
 *         description: Dados do candidato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
routes.get("/:id", controller.show)

/**
 * @swagger
 * /candidates/{id}:
 *   put:
 *     summary: Atualizar um candidato
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do candidato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCandidateDTO'
 *     responses:
 *       200:
 *         description: Candidato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.put("/:id", controller.update)

/**
 * @swagger
 * /candidates/{id}:
 *   delete:
 *     summary: Excluir um candidato
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do candidato
 *     responses:
 *       204:
 *         description: Candidato excluído com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
routes.delete("/:id", controller.delete)

export { routes as candidateRoutes }
