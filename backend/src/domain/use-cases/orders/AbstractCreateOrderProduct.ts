import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { Order } from "@domain/entities/Order";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractCreateOrderProduct{

    protected abstract orderRepository:IOrderRepository
    protected abstract productRepository:IProductRepository
    protected abstract orderProductRepository:IOrderProductRepository

    abstract execute(data:CreateOrderDTO):Promise<Order>

}