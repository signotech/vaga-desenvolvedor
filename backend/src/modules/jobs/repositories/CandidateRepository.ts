import { prisma } from '../../../shared/infra/prisma/client';
import { CreateCandidateDTO } from '../dtos/CandidateDTO';

export class CandidateRepository {
  async create(data: CreateCandidateDTO) {
    return prisma.candidate.create({ data });
  }

  async findAll() {
    return prisma.candidate.findMany();
  }

  async findById(id: number) {
    return prisma.candidate.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<CreateCandidateDTO>) {
    return prisma.candidate.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.candidate.delete({ where: { id } });
  }
}