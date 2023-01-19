import { prisma } from '../../../database/prismaClient';

export class ListOrdeByIdUseCase {
    async execute(id: string) {
        const order = await prisma.order.findUnique({
            where: { id }
        });

        return order;
    }
}
