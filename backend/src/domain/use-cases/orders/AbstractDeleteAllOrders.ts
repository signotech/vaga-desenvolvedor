import { IOrderRepository } from "@domain/repositories/IOrderRepository";

export abstract class AbstractDeleteAllOrders{

    protected abstract orderRepository:IOrderRepository

    abstract execute():Promise<void>

}