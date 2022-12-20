import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface ICreateProduct {
  name: string;
  category: string;
  stock: number;
  unitPrice: string;
  sku: string;
}

export class CreateProductUseCase {
  async execute({ name, category, stock, unitPrice, sku }: ICreateProduct) {

    const hasFieldEmpty = someIsEmpty([name, unitPrice, stock, category, sku]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const skuInUse = await prisma.products.findFirst({where: {sku}});

    if(skuInUse) {
      throw new Error('Código do produto já está em uso.');
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        category,
        stock,
        unitPrice,
        sku
      }
    });

    return newProduct;
  }
}
