import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { AbstractShowAllOrders } from "@domain/use-cases/orders/AbstractShowAllOrders";
import { inject, injectable } from "inversify";

@injectable()
export class ShowAllOrders extends AbstractShowAllOrders{

    constructor(
        @inject("OrderRepository")
        protected orderRepository:IOrderRepository
    ){
        super()
    }

    public async execute(data: ShowAllDTO): Promise<Order[]> {
        const orders = await this.orderRepository.findAll(data)

        return orders
    }



}