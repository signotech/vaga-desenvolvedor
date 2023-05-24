import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { AbstractDeleteAllOrders } from "@domain/use-cases/orders/AbstractDeleteAllOrders";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteAllOrders extends AbstractDeleteAllOrders{

    constructor(
        @inject("OrderRepository")
        protected orderRepository:IOrderRepository
    ){
        super()
    }

    public async execute(): Promise<void> {
        await this.orderRepository.deleteAll()
    }


}