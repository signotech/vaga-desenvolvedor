import { CreateProductDTO } from "@domain/dto/products/CreateProductDTO";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractCreateProduct } from "@domain/use-cases/products/AbstractCreateProduct";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class CreateProduct extends AbstractCreateProduct {

    constructor(
        @inject("ProductRepository")
        protected productRepository: IProductRepository
    ) {
        super()
    }

    public async execute(data: CreateProductDTO): Promise<Product> {
        const skuIsRegistered = await this.productRepository.skuIsRegistered(data.sku)

        if (skuIsRegistered) {
            throw new AppError("SKU já registrado", 422)
        }

        const product = await this.productRepository.create(data)

        return product
    }

}