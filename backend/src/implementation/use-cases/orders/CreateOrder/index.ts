import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { Order } from "@domain/entities/Order";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractCreateOrder, IRequest } from "@domain/use-cases/orders/AbstractCreateOrder";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";


@injectable()
export class CreateOrder extends AbstractCreateOrder{

    constructor(
        @inject('OrderRepository')
        protected orderRepository:IOrderRepository,

        @inject('ClientRepository')
        protected clientRepository:IClientRepository,

        @inject('ProductRepository')
        protected productRepository:IProductRepository,

        @inject('OrderProductRepository')
        protected orderProductRepository:IOrderProductRepository
    ){
        super()
    }

    public async execute(data: IRequest): Promise<Order> {
       
        const clientExists = await this.clientRepository.exists(data.id_cliente)        

        if(!clientExists){
            throw new AppError("Cliente não encontrado", 404)
        }

        const orderProductsIds:number[] = []
        let totalValue = 0

        for(const product of data.ids_produtos){

            const productExists = await this.productRepository.exists(product.id)

            if(!productExists){
                throw new AppError(`Produto de id ${product.id} não encontrado`, 404)
            }

            const productData = await this.productRepository.findById(product.id) 

            if(productData?.estoque! < product.quantidade){
                throw new AppError(`O produto com id ${product.id} não possui estoque o suficiente para esse pedido.`, 422)
            }

            const newQuantity = productData?.estoque! - product.quantidade

            await this.productRepository.update({estoque: newQuantity}, product.id)

            const createdOrderProduct = await this.orderProductRepository.create({quantidade:product.quantidade, id_produto: product.id})

            orderProductsIds.push(createdOrderProduct.id)

            totalValue += Number(productData?.preco!) * product.quantidade
        }

        const createOrderDTO = {
            ...data,
            valor: totalValue,
            ids_produtos: orderProductsIds
        }

        const order = await this.orderRepository.create(createOrderDTO)

        return order
    }

}