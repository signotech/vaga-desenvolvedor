import { CreateOrderProductDTO } from "@domain/dto/orders/CreateOrderProductDTO";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { prismaClient } from "@infra/db/client";
import { OrderProduct, PrismaClient } from "@prisma/client";

export class OrderProductRepository implements IOrderProductRepository{

    protected readonly orderProductModel:PrismaClient['orderProduct']

    constructor(){
        this.orderProductModel = prismaClient.orderProduct
    }

    public async create(data: CreateOrderProductDTO): Promise<OrderProduct> {
        const orderProduct = await this.orderProductModel.create({
            data,
            include: {
                 product:true
            }
        })

        return orderProduct
    }

}