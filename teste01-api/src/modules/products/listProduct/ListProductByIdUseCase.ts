import { prisma } from '../../../database/prismaClient';

export class ListProductByIdUseCase {
    async execute(id: string) {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        return product;
    }
}
