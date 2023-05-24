import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractDeleteAllOrders{

    protected abstract orderRepository:IOrderRepository

    abstract execute():Promise<void>

}