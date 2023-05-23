import { UpdateProductDTO } from "@domain/dto/products/UpdateProductDTO";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractUpdateProduct{

    protected abstract productRepository:IProductRepository

    abstract execute(data:UpdateProductDTO, id:number):Promise<void>

}