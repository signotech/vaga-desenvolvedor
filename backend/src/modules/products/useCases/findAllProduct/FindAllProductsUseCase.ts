import { prisma } from '../../../../database/prismaClient';


export class FindAllProductsUseCase {
  async execute() {
    const products = await prisma.products.findMany();
   
    return products;
  }
}