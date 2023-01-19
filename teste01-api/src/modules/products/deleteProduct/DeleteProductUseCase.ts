import {prisma} from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

export class DeleteProductUseCase {
	async execute(id: string) {
		const product = await prisma.product.findFirst({
			where: {id},
		});
		if (!product) {
			return new AppError('product does not exists');
		}

		await prisma.product.delete({
			where: {id},
		});

		return {
			message: 'Product deleted with successfully',
		};
	}
}
