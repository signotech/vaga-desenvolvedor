import { prisma } from '../../../../database/prismaClient';

interface IFindAllProductsUseCaseProps {
  name: string;
  skip: number;
  category: string
  orderBy: string
}

export class FindAllProductsUseCase {
  async execute({ name, skip, category, orderBy }:IFindAllProductsUseCaseProps) {
    const pageSize = 20;

    const existingOrderBy = orderBy || 'created_at';


    if(name === 'undefined' || category === 'undefined' || orderBy === 'undefined') {
      const products = await prisma.products.findMany({
        select: {
          name: true,
          id: true
        }
      });

      return products;
    }

    const products = await prisma.products.findMany({
      where: {
        AND: [
          { name: {contains: name, mode: 'insensitive'}},
        ],
        OR: [
          { category: {contains: category, mode: 'insensitive'}},
        ]
      },
      orderBy: {
        [existingOrderBy]: 'asc'
      },
      take: pageSize, // seleciona apenas 5 resultados
      skip: (skip - 1) * pageSize,
    });

    const count = await prisma.products.count();

    return {products, count, pageSize};
  }
}
