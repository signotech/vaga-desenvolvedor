import { CreateOrderProductDTO } from "@domain/dto/orders/CreateOrderProductDTO";
import { OrderProduct } from "@domain/entities/OrderProduct";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { prismaClient } from "@infra/db/client";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
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