import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';
import AppError from '../../../../errors/AppError';

type ICreateUser = {
    name: string;
    username: string;
    password: string;
};

export class CreateUserUseCase {
    async execute({ name, username, password }: ICreateUser) {
        const userExist = await prisma.user.findFirst({
            where: {
                username: {
                    mode: 'insensitive',
                },
            },
        });

        if (userExist) {
            return new AppError('user already exists');
        }

        const hashPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashPassword,
            },
        });

        return user;
    }
}
