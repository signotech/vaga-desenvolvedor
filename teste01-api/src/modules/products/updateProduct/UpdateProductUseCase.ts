import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type IUpdateProduct = {
	id: string;
	sku_produto: string;
	titulo_produto: string;
	preco: number;
	estoque: number;
};

export class UpdateProductUseCase {
	async execute({ id, sku_produto, titulo_produto, preco, estoque }: IUpdateProduct) {
		const productE = await prisma.product.findFirst({
			where: {
				id,
			},
		});

		if (!productE) {
			return new AppError('this product does not exists');
		}

		const productAlreadyExists = await prisma.product.findFirst({
			where: {
				sku_produto,
			},
		});

		if (productAlreadyExists && sku_produto !== productE?.sku_produto) {
			return new AppError('this product already exists');
		}

		const product = await prisma.product.update({
			data: {
				id,
				sku_produto,
				titulo_produto,
				preco,
				estoque,
			},
			where: {
				id,
			},
		});

		return product;
	}
}
