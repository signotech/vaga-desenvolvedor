import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateProductDTO } from "@domain/dto/products/CreateProductDTO";
import { UpdateProductDTO } from "@domain/dto/products/UpdateProductDTO";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { prismaClient } from "@infra/db/client";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository {

    private readonly productModel: PrismaClient['product']

    constructor() {
        this.productModel = prismaClient.product
    }

    public async findAll(data: ShowAllDTO): Promise<Product[]> {
        const products = await this.productModel.findMany({
            take: data.take,
            skip: data.skip
        })

        return products
    }

    public async findById(id: number): Promise<Product | null> {
        const product = await this.productModel.findFirst({
            where: { id }
        })

        return product
    }

    public async skuIsRegistered(sku: string): Promise<Product | null> {
        const product = await this.productModel.findFirst({
            where: { sku }
        })

        return product
    }

    public async exists(id: number): Promise<boolean> {
        const product = await this.productModel.findFirst({ where: { id } })

        return !!product
    }

    public async create(data: CreateProductDTO): Promise<Product> {
        const product = await this.productModel.create({
            data
        })
        return product
    }

    public async update(data: UpdateProductDTO, id: number): Promise<void> {
        await this.productModel.update({
            where: { id },
            data
        })
    }

    public async delete(id: number): Promise<void> {
        await this.productModel.delete({where:{id}})
    }

    public async deleteAll():Promise<void>{
        await this.productModel.deleteMany()
    }

}