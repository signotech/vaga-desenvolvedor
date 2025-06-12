import { prisma } from '../../../shared/infra/prisma/client';
import { CreateJobDTO } from '../dtos/CreateJobDTO';

export class JobRepository {
  async create(data: CreateJobDTO) {
    return prisma.job.create({ data });
  }

  async findAll() {
    return prisma.job.findMany();
  }

  async findById(id: number) {
    return prisma.job.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<CreateJobDTO>) {
    return prisma.job.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.job.delete({ where: { id } });
  }
}
