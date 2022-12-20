import { prisma } from '../../../../database/prismaClient';

export class FindAllOrdersUseCase {
  async execute() {
    const orders = await prisma.orders.findMany({
      include: {
        client: true,
        product: true
      },
      orderBy: {
        code: 'asc'
      }
    });
   
    return (
      orders.map(order => {
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
      })
    );
  }
}