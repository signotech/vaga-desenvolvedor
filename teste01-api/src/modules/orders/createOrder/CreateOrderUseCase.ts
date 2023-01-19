import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type ICreateOrder = {
	sku_produto: string;
	estoque: number;
};

export class CreateOrderUseCase {
	async execute({ sku_produto, estoque }: ICreateOrder) {
		const productExists = await prisma.product.findFirst({
			where: {
				sku_produto,
			},
		});

		if (!productExists) {
			return new AppError('this product does not exists');
		}

		const order = await prisma.order.create({
			data: {
				sku_produto,
				estoque,
				status: 'Em Aberto',
			},
		});

		return order;
	}
}
