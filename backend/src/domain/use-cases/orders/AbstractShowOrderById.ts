import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractShowOrderById{

    protected abstract orderRepository:IOrderRepository

    abstract execute(id:number):Promise<Order>

}