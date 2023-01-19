import { prisma } from '../../../database/prismaClient';

export class ListProductsUseCase {
    async execute() {
        const products = await prisma.product.findMany();

        return products;
    }
}
