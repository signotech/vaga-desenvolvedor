import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';

type IAuthenticateUser = {
	username: string;
	password: string;
};

export class AuthenticateUserUseCase {
	async execute({ username, password }: IAuthenticateUser) {
		const user = await prisma.user.findFirst({
			where: {
				username,
			},
		});

		if (!user) {
			return new AppError('username or password invalid');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			return new AppError('username or password invalid');
		}

		const token = sign({ username }, `${process.env.JWT_TOKEN}`, {
			subject: user?.id,
			expiresIn: `${process.env.JWT_EXPIRES_IN}`,

		});

		return {
			user,
			token,
		};
	}
}
