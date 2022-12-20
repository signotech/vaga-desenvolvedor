import { prisma } from '../../../../database/prismaClient';


export class FindAllClientsUseCase {
  async execute() {
    const clients = await prisma.clients.findMany();
   
    return clients;
  }
}