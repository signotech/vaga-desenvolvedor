import {prisma} from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type ICreateClient = {
	nome_cliente: string;
	email_cliente: string;
	cpf_cliente: string;
};

export class CreateClientUseCase {
	async execute({nome_cliente, email_cliente, cpf_cliente}: ICreateClient) {
		const clientEmailAlreadyExists = await prisma.client.findFirst({
			where: {
				email_cliente,
			},
		});

		if (clientEmailAlreadyExists) {
			return new AppError('this client already exists');
		}

		const clientCpfAlreadyExists = await prisma.client.findFirst({
			where: {
				cpf_cliente,
			},
		});

		if (clientCpfAlreadyExists) {
			return new AppError('this client already exists');
		}

		const client = await prisma.client.create({
			data: {
				nome_cliente,
				email_cliente,
				cpf_cliente,
			},
		});

		return client;
	}
}
