import { prisma } from '../../../../database/prismaClient';

interface IFindAllClientsProps {
  name: string;
  skip: number;
  orderBy: string
}

export class FindAllClientsUseCase {
  async execute({ name, orderBy, skip}:IFindAllClientsProps) {
    const pageSize = 20;


    const existingOrderBy = orderBy || 'created_at' ;

    if(name === 'undefined' || orderBy === 'undefined') {
      const clients = await prisma.clients.findMany({
        select: {
          name: true,
          id: true,
        }
      });

      return clients;
    }

    const clients = await prisma.clients.findMany({
      where: {
        AND: [
          { name: {contains: name, mode: 'insensitive'}},
        ],
      },
      orderBy: {
        [existingOrderBy]: 'asc'
      },
      take: pageSize, // seleciona apenas 5 resultados
      skip: (skip - 1) * pageSize,
    });

    const count = await prisma.clients.count();

    return {clients, count, pageSize};
  }
}
