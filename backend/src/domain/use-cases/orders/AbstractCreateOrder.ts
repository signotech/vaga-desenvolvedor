import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { Order } from "@domain/entities/Order";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { Decimal } from "@prisma/client/runtime/binary";
import { injectable } from "inversify";

export interface IRequest{
    ids_produtos: {
        id:number,
        quantidade:number
    }[],
    desconto?: number
    status:number
    data: Date
    id_cliente:number
}

@injectable()
export abstract class AbstractCreateOrder{

    protected abstract orderRepository:IOrderRepository
    protected abstract clientRepository:IClientRepository
    protected abstract productRepository:IProductRepository
    protected abstract orderProductRepository:IOrderProductRepository

    abstract execute(data:IRequest):Promise<Order>

}