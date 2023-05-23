import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractShowAllOrders{
    protected abstract orderRepository:IOrderRepository

    abstract execute(data:ShowAllDTO):Promise<Order[]>
}