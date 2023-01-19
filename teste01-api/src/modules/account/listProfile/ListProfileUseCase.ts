import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type IRequest = {
	id: string;
};

export class ListProfileUseCase {
	async execute({ id }: IRequest) {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
		});

		if (!user) {
			return new AppError('user does not exists');
		}

		return user;
	}
}
