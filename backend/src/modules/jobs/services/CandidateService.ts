import { CandidateRepository } from '../repositories/CandidateRepository';
import { CreateCandidateDTO } from '../dtos/CandidateDTO';

export class CandidateService {
  constructor(private candidateRepository = new CandidateRepository()) {}

  create(data: CreateCandidateDTO) {
    return this.candidateRepository.create(data);
  }

  list() {
    return this.candidateRepository.findAll();
  }

  get(id: number) {
    return this.candidateRepository.findById(id);
  }

  update(id: number, data: Partial<CreateCandidateDTO>) {
    return this.candidateRepository.update(id, data);
  }

  delete(id: number) {
    return this.candidateRepository.delete(id);
  }
}