import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class ShowProductById {

    protected abstract productRepository:IProductRepository

    abstract execute(id:number):Promise<Product>

}