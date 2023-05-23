import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractShowProductById } from "@domain/use-cases/products/AbstractShowProductById";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class ShowProductById extends AbstractShowProductById{

    constructor(
        @inject("ProductRepository")
        protected productRepository:IProductRepository
    ){
        super()
    }

    public async execute(id: number): Promise<Product> {
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new AppError("Produto não encontrado", 404)
        }

        return product
    }

}