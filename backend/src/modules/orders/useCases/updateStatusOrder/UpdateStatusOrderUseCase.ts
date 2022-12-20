import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';

interface IUpdateStatusOrder {
  status: string,
  id: string,
}

export class UpdateStatusOrderUseCase {
  async execute({id, status}:IUpdateStatusOrder) {

    const hasFieldEmpty = someIsEmpty([ id, status]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

  
    const order = await prisma.orders.update({
      where: {
        id
      },
      include: {
        client: true,
        product: true
      },
      data: {
        status,
      }
    });


    return {
      id: order.id,
      code_order : order.code,
      status: order.status,
      name: order.client.name,
      product: order.product.name,
      date: order.created_at,
      quantity: order.quantity,
      totalPrice: order.quantity * Number(order.product.unitPrice)
    }; 
  }
}