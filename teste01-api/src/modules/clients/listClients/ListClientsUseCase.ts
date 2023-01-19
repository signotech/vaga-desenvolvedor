import { prisma } from '../../../database/prismaClient';

export class ListClientsUseCase {
    async execute() {
        const clients = await prisma.client.findMany();

        return clients;
    }
}
