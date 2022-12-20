import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface ICreateOrder{
  productsId: string;
  clientsId: string;
  quantity: number;
  status?: 'Aberto' | 'Pago' | 'Cancelado'; 
}


export class CreateOrderUseCase {
  async execute({ productsId,clientsId, quantity }: ICreateOrder) {

    const hasFieldEmpty = someIsEmpty([productsId,clientsId, quantity]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const product = await prisma.products.findFirst({where: {id: productsId}});
    
    if(!product) {
      throw new Error('Esse produto nao existe.');
    }

    if(product.stock < quantity) {
      throw new Error('Produto sem estoque disponível.');
    }

    await prisma.products.update({
      where: {
        id: productsId,
      },
      data: {
        stock: {
          decrement: quantity
        }
      }
    });

    const newOrder= await prisma.orders.create({
      data: {
        status: 'Aberto',
        clientsId,
        productsId,
        quantity
      },
      include: {
        client: true,
        product: true
      }
    });

    return {
      id: newOrder.id,
      code_order : newOrder.code,
      status: newOrder.status,
      name: newOrder.client.name,
      product: newOrder.product.name,
      date: newOrder.created_at,
      quantity: newOrder.quantity,
      totalPrice: newOrder.quantity * Number(newOrder.product.unitPrice)
    };
  }
}