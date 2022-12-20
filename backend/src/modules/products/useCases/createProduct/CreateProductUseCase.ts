import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface ICreateProduct {
  name: string;
  category: string;
  stock: number;
  unitPrice: string;
}

export class CreateProductUseCase {
  async execute({ name, category, stock, unitPrice }: ICreateProduct) {

    const hasFieldEmpty = someIsEmpty([name, unitPrice, stock, category]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const nameInUse = await prisma.products.findFirst({where: {name}});

    if(nameInUse) {
      throw new Error('Nome já está em uso.');
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        category,
        stock,
        unitPrice
      }
    });

    return newProduct;
  }
}