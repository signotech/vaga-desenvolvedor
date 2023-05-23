import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractShowAllProducts{

    protected abstract productsRepository:IProductRepository

    abstract execute(data:ShowAllDTO):Promise<Product[]>

}