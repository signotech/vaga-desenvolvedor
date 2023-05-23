import { UpdateProductDTO } from "@domain/dto/products/UpdateProductDTO";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractUpdateProduct } from "@domain/use-cases/products/AbstractUpdateProduct";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateProduct extends AbstractUpdateProduct{

    constructor(
        @inject("ProductRepository")
        protected productRepository:IProductRepository
    ){
        super()
    }

    public async execute(data: UpdateProductDTO, id: number): Promise<void> {
        const productExists = await this.productRepository.exists(id)  

        if(!productExists){
            throw new AppError("Produto não encontrado.", 404)
        }

        if(data.sku){
            const skuIsRegistered = await this.productRepository.skuIsRegistered(data.sku)

            if(skuIsRegistered && skuIsRegistered.id !== id){
                throw new AppError("SKU já registrado em outro produto.", 422)
            }
        }

        await this.productRepository.update(data, id)
    }

}