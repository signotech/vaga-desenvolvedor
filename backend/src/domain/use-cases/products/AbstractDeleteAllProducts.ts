import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractDeleteAllProducts{

    protected abstract productRepository:IProductRepository

    abstract execute():Promise<void>

}