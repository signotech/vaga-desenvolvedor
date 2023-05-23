import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { prismaClient } from "@infra/db/client";
import { PrismaClient } from "@prisma/client";

export class OrderRepository implements IOrderRepository {

    protected readonly orderModel: PrismaClient['order']

    constructor() {
        this.orderModel = prismaClient.order
    }

    public async findAll(data: ShowAllDTO): Promise<Order[]> {
        const orders = await this.orderModel.findMany({
            take: data.take,
            skip: data.skip,
            include: {
                client: true,
                JoinOrdersProducts: {
                    include: {
                        product: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })

        return orders
    }

    public async findById(id: number): Promise<Order | null> {
        const order = await this.orderModel.findFirst({
            where: { id },
            include: {
                client: true,
                JoinOrdersProducts: {
                    include: {
                        product: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })

        return order
    }

    public async create({ id_cliente, ids_produtos, data, valor, desconto }: CreateOrderDTO): Promise<Order> {
        const order = await this.orderModel.create({
            data: {
                data,
                valor,
                desconto,
                id_cliente,
                JoinOrdersProducts: {
                    connect: ids_produtos.map(id => ({ id }))
                }
            },
            include: {
                client: true,
                JoinOrdersProducts: {
                    include: {
                        product: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })

        return order
    }

}