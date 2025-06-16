import { JobRepository } from '../repositories/JobRepository';
import { CreateJobDTO } from '../dtos/CreateJobDTO';

export class JobService {
  constructor(private jobRepository = new JobRepository()) {}

  create(data: CreateJobDTO) {
    return this.jobRepository.create(data);
  }

  list() {
    return this.jobRepository.findAll();
  }

  get(id: number) {
    return this.jobRepository.findById(id);
  }

  update(id: number, data: Partial<CreateJobDTO>) {
    return this.jobRepository.update(id, data);
  }

  delete(id: number) {
    return this.jobRepository.delete(id);
  }
}
