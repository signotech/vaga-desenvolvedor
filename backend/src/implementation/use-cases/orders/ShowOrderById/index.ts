import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { AbstractShowOrderById } from "@domain/use-cases/orders/AbstractShowOrderById";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class ShowOrderById extends AbstractShowOrderById {

    constructor(
        @inject("OrderRepository")
        protected orderRepository: IOrderRepository
    ) {
        super()
    }

    public async execute(id: number): Promise<Order> {
        let order = await this.orderRepository.findById(id)

        if (!order) {
            throw new AppError("Pedido não encontrado.", 404)
        }

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

        

    }

}