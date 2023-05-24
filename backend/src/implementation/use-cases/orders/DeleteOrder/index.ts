import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { AbstractDeleteOrder } from "@domain/use-cases/orders/AbstractDeleteOrder";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteOrder extends AbstractDeleteOrder{

    constructor(
        @inject("OrderRepository")
        protected orderRepository:IOrderRepository
    ){
        super()
    }

    public async execute(id: number): Promise<void> {
        const orderExists = await this.orderRepository.exists(id)

        if(!orderExists){
            throw new AppError("Pedido não encontrado", 404)
        }

        await this.orderRepository.delete(id)
    }

}