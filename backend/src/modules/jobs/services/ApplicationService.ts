import { ApplicationRepository } from '../repositories/ApplicationRepository'
import { CreateApplicationDTO } from '../dtos/ApplicationDTO'

export class ApplicationService {
  constructor(private applicationRepository = new ApplicationRepository()) {}

  async create(data: CreateApplicationDTO) {
    const existing = await this.applicationRepository.findByCandidateAndJob(
      data.candidateId,
      data.jobId,
    )

    if (existing) {
      throw new Error('Candidate already applied to this job.')
    }

    return this.applicationRepository.create(data)
  }

  list() {
    return this.applicationRepository.findAll()
  }

  get(id: number) {
    return this.applicationRepository.findById(id)
  }

  update(id: number, data: Partial<CreateApplicationDTO>) {
    return this.applicationRepository.update(id, data)
  }

  delete(id: number) {
    return this.applicationRepository.delete(id)
  }
}
