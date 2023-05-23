import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractDeleteAllProducts } from "@domain/use-cases/products/AbstractDeleteAllProducts";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteAllProducts extends AbstractDeleteAllProducts{

    constructor(
        @inject("ProductRepository")
        protected productRepository:IProductRepository
    ){
        super()
    }

    public async execute(): Promise<void> {
        await this.productRepository.deleteAll()
    }

}