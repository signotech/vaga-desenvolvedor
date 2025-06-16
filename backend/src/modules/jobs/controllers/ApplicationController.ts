import { Request, Response } from 'express'
import { ApplicationService } from '../services/ApplicationService'
import { CreateApplicationDTO } from '../dtos/ApplicationDTO'

const service = new ApplicationService()

export class ApplicationController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateApplicationDTO = req.body
      const application = await service.create(data)
      return res.status(201).json(application)
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('candidateId') &&
        error.meta?.target?.includes('jobId')
      ) {
        return res.status(409).json({ error: 'Candidate already applied for this job.' })
      }
      return res.status(400).json({ error: 'Invalid application data.' })
    }
  }

  async list(req: Request, res: Response) {
    const applications = await service.list()
    return res.json(applications)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params
    const application = await service.get(Number(id))
    return application
      ? res.json(application)
      : res.status(404).json({ error: 'Application not found.' })
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const application = await service.update(Number(id), req.body)
      return res.json(application)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const application = await service.get(Number(id))
      if (!application) {
        return res.status(404).json({ error: 'Application not found.' })
      }
      await service.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
}
