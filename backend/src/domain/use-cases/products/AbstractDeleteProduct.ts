import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractDeleteProduct{

    protected abstract productRepository:IProductRepository

    abstract execute(id:number):Promise<void>
    

}