import { prisma } from '../../../database/prismaClient';

export class ListClientByIdUseCase {
    async execute(id: string) {
        const client = await prisma.client.findUnique({
            where: { id }
        });

        return client;
    }
}
