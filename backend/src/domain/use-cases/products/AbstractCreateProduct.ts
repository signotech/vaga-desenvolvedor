import { CreateProductDTO } from "@domain/dto/products/CreateProductDTO";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractCreateProduct{

    protected abstract productRepository:IProductRepository

    abstract execute(data:CreateProductDTO):Promise<Product>

}