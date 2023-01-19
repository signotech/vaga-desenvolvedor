import {prisma} from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

export class DeleteClientUseCase {
	async execute(id: string) {
		const client = await prisma.client.findFirst({
			where: {id},
		});
		if (!client) {
			return new AppError('client does not exists');
		}

		await prisma.client.delete({
			where: {id},
		});

		return {
			message: 'Client deleted with successfully',
		};
	}
}
