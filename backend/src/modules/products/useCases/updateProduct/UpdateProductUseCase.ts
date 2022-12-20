import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface IUpdateProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  unitPrice: string;
  sku: string;

}


export class UpdateProductUseCase {
  async execute({ id, name, category, stock, unitPrice, sku }: IUpdateProduct) {

    const hasFieldEmpty = someIsEmpty([name, unitPrice, stock, category]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const updatedProduct = await prisma.products.update({
      where: {
        id
      },
      data: {
        name,
        category,
        stock,
        unitPrice,
        sku
      }
    });

    return updatedProduct;
  }
}
