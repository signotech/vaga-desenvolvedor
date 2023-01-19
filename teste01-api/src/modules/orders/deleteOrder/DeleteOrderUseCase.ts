import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

export class DeleteOrderUseCase {
	async execute(id: string) {
		const order = await prisma.order.findFirst({
			where: { id },
		});
		if (!order) {
			return new AppError('order does not exists');
		}

		await prisma.order.delete({
			where: { id },
		});

		return {
			message: 'order deleted with successfully',
		};
	}
}
