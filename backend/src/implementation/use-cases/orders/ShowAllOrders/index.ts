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
        let orders = await this.orderRepository.findAll(data)

        orders = orders.map(order => {

            switch(order.status){
                case 0:
                    order.status = "ABERTO"
                    break;
                case 1:
                    order.status = "PAGO"
                    break;
                case 2:
                    order.status = "CANCELADO"
                    break;
            }

            return order
        })

        return orders
    }



}