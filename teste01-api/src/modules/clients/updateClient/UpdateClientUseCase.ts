import { prisma } from '../../../database/prismaClient';
import AppError from '../../../errors/AppError';

type IUpdateClient = {
	id: string;
	nome_cliente: string;
	email_cliente: string;
	cpf_cliente: string;
};

export class UpdateClientUseCase {
	async execute({ id, nome_cliente, email_cliente, cpf_cliente }: IUpdateClient) {
		const clientCpfAlreadyExists = await prisma.client.findFirst({
			where: {
				cpf_cliente,
			},
		});

		if (clientCpfAlreadyExists && cpf_cliente !== clientCpfAlreadyExists?.cpf_cliente) {
			return new AppError('this client already exists');
		}

		const clientEmailAlreadyExists = await prisma.client.findFirst({
			where: {
				email_cliente,
			},
		});

		if (clientEmailAlreadyExists && email_cliente !== clientEmailAlreadyExists?.email_cliente) {
			return new AppError('this client already exists');
		}

		const client = await prisma.client.update({
			data: {
				nome_cliente,
				email_cliente,
				cpf_cliente,
			},
			where: {
				id,
			},
		});

		return client;
	}
}
