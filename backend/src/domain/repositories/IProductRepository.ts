import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateProductDTO } from "@domain/dto/products/CreateProductDTO";
import { UpdateProductDTO } from "@domain/dto/products/UpdateProductDTO";
import { Product } from "@domain/entities/Product";

export interface IProductRepository{

    findAll(data:ShowAllDTO):Promise<Product[]>
    findById(id:number):Promise<Product>
    skuIsRegistered(sku:string):Promise<Product>
    exists(id:number):Promise<boolean>
    create(data:CreateProductDTO):Promise<Product>
    update(data:UpdateProductDTO, id:number):Promise<void>
    delete(id:number):Promise<void>
    deleteAll():Promise<void>

}