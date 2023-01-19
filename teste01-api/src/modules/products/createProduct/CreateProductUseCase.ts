import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type ICreateProduct = {
	sku_produto: string;
	titulo_produto: string;
	preco: number;
	estoque: number;
};

export class CreateProductUseCase {
	async execute({ sku_produto, titulo_produto, preco, estoque }: ICreateProduct) {
		const productAlreadyExists = await prisma.product.findFirst({
			where: {
				sku_produto,
			},
		});

		if (productAlreadyExists) {
			return new AppError('this product already exists');
		}

		const product = await prisma.product.create({
			data: {
				sku_produto,
				titulo_produto,
				preco,
				estoque,
			},
		});

		return product;
	}
}
