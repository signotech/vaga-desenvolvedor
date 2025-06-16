import { Request, Response } from 'express';
import { JobService } from '../services/JobService';

const service = new JobService();

export class JobController {
  async create(req: Request, res: Response) {
    try {
      const job = await service.create(req.body);
      return res.status(201).json(job);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid job data.' });
    }
  }

  async list(req: Request, res: Response) {
    const jobs = await service.list();
    return res.json(jobs);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const job = await service.get(Number(id));
    return job ? res.json(job) : res.status(404).json({ error: 'Job not found.' });
  }

async update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const job = await service.update(Number(id), req.body);
    return res.json(job);
  } catch (error) {
    console.error('Error when trying to find job position.', error);
    return res.status(500).json({ error: 'Internal error.' });
  }
}

  async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const job = await service.get(Number(id));
    if (!job) {
      return res.status(404).json({ error: 'Job wasnt found.' });
    }

    await service.delete(Number(id));
    return res.status(204).send();

  } catch (error) {
    console.error('Error when deleting the job position:', error);
    return res.status(500).json({ error: 'Internal error.' });
  }
}

}
