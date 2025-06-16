import type { Request, Response } from "express"
import { ApplicationService } from "../services/ApplicationService"
import type { CreateApplicationDTO } from "../dtos/ApplicationDTO"

const service = new ApplicationService()

export class ApplicationController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateApplicationDTO = req.body
      const application = await service.create(data)
      return res.status(201).json(application)
    } catch (error: any) {
      if (error.message === "Candidate already applied to this job.") {
        return res.status(409).json({
          error: "Este candidato já se inscreveu nesta vaga.",
          code: "DUPLICATE_APPLICATION",
        })
      }

      if (
        error.code === "P2002" &&
        error.meta?.target?.includes("candidateId") &&
        error.meta?.target?.includes("jobId")
      ) {
        return res.status(409).json({
          error: "Este candidato já se inscreveu nesta vaga.",
          code: "DUPLICATE_APPLICATION",
        })
      }

      console.error("Error creating application:", error)
      return res.status(400).json({ error: "Dados de inscrição inválidos." })
    }
  }

  async list(req: Request, res: Response) {
    const applications = await service.list()
    return res.json(applications)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params
    const application = await service.get(Number(id))
    return application ? res.json(application) : res.status(404).json({ error: "Inscrição não encontrada." })
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const application = await service.update(Number(id), req.body)
      return res.json(application)
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor." })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const application = await service.get(Number(id))
      if (!application) {
        return res.status(404).json({ error: "Inscrição não encontrada." })
      }
      await service.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor." })
    }
  }

  // Novo endpoint para verificar se candidato já se inscreveu
  async checkExisting(req: Request, res: Response) {
    try {
      const { candidateId, jobId } = req.query

      if (!candidateId || !jobId) {
        return res.status(400).json({ error: "candidateId e jobId são obrigatórios." })
      }

      const exists = await service.checkExistingApplication(Number(candidateId), Number(jobId))

      return res.json({ exists })
    } catch (error) {
      console.error("Error checking existing application:", error)
      return res.status(500).json({ error: "Erro interno do servidor." })
    }
  }
}
