import { Request, Response } from 'express';
import { CandidateService } from '../services/CandidateService';

const service = new CandidateService();

export class CandidateController {
  async create(req: Request, res: Response) {
    try {
      const candidate = await service.create(req.body);
      return res.status(201).json(candidate);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid candidate data.' });
    }
  }

  async list(req: Request, res: Response) {
    const candidates = await service.list();
    return res.json(candidates);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const candidate = await service.get(Number(id));
    return candidate ? res.json(candidate) : res.status(404).json({ error: 'Candidate not found.' });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const candidate = await service.update(Number(id), req.body);
      return res.json(candidate);
    } catch (error) {
      console.error('Error when trying to find candidate.', error);
      return res.status(500).json({ error: 'Internal error.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const candidate = await service.get(Number(id));
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate wasnt found.' });
      }

      await service.delete(Number(id));
      return res.status(204).send();

    } catch (error) {
      console.error('Error when deleting the candidate:', error);
      return res.status(500).json({ error: 'Internal error.' });
    }
  }
}