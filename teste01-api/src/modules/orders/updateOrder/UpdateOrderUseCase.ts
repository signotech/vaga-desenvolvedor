import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type IUpdateOrder = {
	id: string;
	status: string;
};

export class UpdateOrderUseCase {
	async execute({ id, status }: IUpdateOrder) {
		const order = await prisma.order.update({
			data: {
				id,
				status,
			},
			where: {
				id,
			},
		});

		return order;
	}
}
