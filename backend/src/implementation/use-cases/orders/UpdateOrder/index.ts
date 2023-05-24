import { IClientRepository } from "@domain/repositories/IClientRepository";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractUpdateOrder, IRequestUpdateOrder } from "@domain/use-cases/orders/AbstractUpdateOrder";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateOrder extends AbstractUpdateOrder {

    constructor(
        @inject("OrderRepository")
        protected orderRepository: IOrderRepository,

        @inject("ClientRepository")
        protected clientRepository: IClientRepository,

    ) {
        super()
    }

    public async execute(data: IRequestUpdateOrder, id: number): Promise<void> {

        const orderExists = await this.orderRepository.exists(id)

        if (!orderExists) {
            throw new AppError("Pedido não encontrado", 404)
        }

        if (data.id_cliente) {
            const clientExists = await this.clientRepository.exists(data.id_cliente)

            if (!clientExists) {
                throw new AppError("Cliente não encontrado", 404)
            }

        }

        await this.orderRepository.update(data, id)

    }

}