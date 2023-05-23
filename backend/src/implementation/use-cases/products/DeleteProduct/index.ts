import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractDeleteProduct } from "@domain/use-cases/products/AbstractDeleteProduct";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteProduct extends AbstractDeleteProduct{

    constructor(
        @inject("ProductRepository")
        protected productRepository:IProductRepository
    ){
        super()
    }

    public async execute(id: number): Promise<void> {
        const productExists = await this.productRepository.exists(id)

        if(!productExists){
            throw new AppError("Produto não encontrado", 404)
        }

        await this.productRepository.delete(id)
    }

}