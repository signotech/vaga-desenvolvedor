import { prisma } from '../../../database/prismaClient';

export class ListOrdersUseCase {
    async execute() {
        const orders = await prisma.order.findMany();

        return orders;
    }
}
