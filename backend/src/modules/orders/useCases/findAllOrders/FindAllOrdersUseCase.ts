import { prisma } from '../../../../database/prismaClient';

interface IFindAllOrdersProps {
  skip: number;
  category: string
}


export class FindAllOrdersUseCase {
  async execute({ skip, category }:IFindAllOrdersProps) {
    const pageSize = 20;

    const orders = await prisma.orders.findMany({
      where: {
        OR: [
          { status: {contains: category, mode: 'insensitive'}},
        ]
      },

      take: pageSize, // seleciona apenas 5 resultados
      skip: (skip - 1) * pageSize,
      include: {
        client: true,
        product: true
      },
    });


    const count = await prisma.orders.count();

    return {
      orders : orders.map(order => {
        return {
          id: order.id,
          code_order : order.code,
          status: order.status,
          name: order.client.name,
          product: order.product.name,
          date: order.created_at,
          quantity: order.quantity,
          totalPrice: order.quantity * Number(order.product.unitPrice),
        };
      }),
      count,
      pageSize
    };
  }
}
