import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractDeleteOrder{

    protected abstract orderRepository:IOrderRepository

    abstract execute(id:number):Promise<void>

}