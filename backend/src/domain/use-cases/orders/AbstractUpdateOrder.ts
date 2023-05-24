import { UpdateOrderDTO } from "@domain/dto/orders/UpdateOrderDTO";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { Decimal } from "@prisma/client/runtime/binary";
import { injectable } from "inversify";

export interface IRequestUpdateOrder {
    desconto?: number
    data?: Date
    id_cliente?: number
    status?: number
}

@injectable()
export abstract class AbstractUpdateOrder {

    protected abstract orderRepository: IOrderRepository
    protected abstract clientRepository: IClientRepository

    abstract execute(data: IRequestUpdateOrder, id: number): Promise<void>

}