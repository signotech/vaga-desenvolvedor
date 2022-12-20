import { prisma } from '../../../../database/prismaClient';


export class DeleteOrderUseCase {
  async execute( id: string) {
    
    if (!id) {
      throw new Error('O ID da Pedido precisa ser informado para sua deleção.');
    }

    try {
      const order = await prisma.orders.findFirst({where: {id}});
      
      await prisma.products.update({
        where: {
          id: order?.productsId
        },
        data: {
          stock: {
            increment: order?.quantity
          }
        }
      });

      await prisma.orders.delete({where: {id}});
    } catch (error) {
      throw new Error('Nao foi possível remover esse pedido, tente novamente mais tarde.');
    }
  }
}