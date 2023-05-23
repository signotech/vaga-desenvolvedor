import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractShowAllProducts } from "@domain/use-cases/products/AbstractShowAllProducts";
import { inject, injectable } from "inversify";

@injectable()
export abstract class ShowAllProducts extends AbstractShowAllProducts{

    constructor(
        @inject("ProductRepository")
        private productRepository:IProductRepository
    ){
       super() 
    }

    public async execute(data: ShowAllDTO): Promise<Product[]> {
        const products = await this.productRepository.findAll(data)
        return products
    }

}