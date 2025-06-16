import { prisma } from "../../../shared/infra/prisma/client"
import type { CreateCandidateDTO } from "../dtos/CandidateDTO"

export class CandidateRepository {
  async create(data: CreateCandidateDTO) {
    return prisma.candidate.create({ data })
  }

  async findAll() {
    return prisma.candidate.findMany()
  }

  async findById(id: number) {
    return prisma.candidate.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string) {
    return prisma.candidate.findUnique({
      where: { email },
    })
  }

  async update(id: number, data: Partial<CreateCandidateDTO>) {
    return prisma.candidate.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.candidate.delete({ where: { id } })
  }
}
