import { prisma } from '../../../shared/infra/prisma/client'
import { CreateApplicationDTO } from '../dtos/ApplicationDTO'

export class ApplicationRepository {
  async create(data: CreateApplicationDTO) {
    return prisma.application.create({ data })
  }

  async findByCandidateAndJob(candidateId: number, jobId: number) {
    return prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId,
          jobId,
        },
      },
    })
  }

  async findAll() {
    return prisma.application.findMany()
  }

  async findById(id: number) {
    return prisma.application.findUnique({ where: { id } })
  }

  async update(id: number, data: Partial<CreateApplicationDTO>) {
    return prisma.application.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.application.delete({ where: { id } })
  }
}
