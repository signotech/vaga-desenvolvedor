import { prisma } from '../../../../database/prismaClient';


export class DeleteProductUseCase {
  async execute( id: string) {
    
    if (!id) {
      throw new Error('O ID do produto precisa ser informado para sua deleção.');
    }

    await prisma.products.delete({where: {id}});
  }
}