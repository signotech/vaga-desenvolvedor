import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { UpdateOrderDTO } from "@domain/dto/orders/UpdateOrderDTO";
import { Order } from "@domain/entities/Order";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { prismaClient } from "@infra/db/client";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/binary";
import { injectable } from "inversify";

@injectable()
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

    public async exists(id: number): Promise<boolean> {
        const order = await this.orderModel.findFirst({ where: { id } })

        return !!order
    }

    public async create({ id_cliente, ids_produtos, data, status, valor, desconto }: CreateOrderDTO): Promise<Order> {

        console.log(ids_produtos)

        const ids_to_connect = ids_produtos.map(id => ({ id }))

        const order = await this.orderModel.create({
            data: {
                data,
                valor,
                desconto,
                status,
                JoinOrdersProducts: {
                    create: ids_produtos.map(id => ({
                        product: {
                            connect: { id }
                        }
                    }))
                },
                client: {
                    connect: {
                        id: id_cliente
                    }
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

    public async update(data: UpdateOrderDTO, id: number): Promise<void> {
        await this.orderModel.update({
            where: { id },
            data
        })
    }

    public async delete(id: number): Promise<void> {
        await this.orderModel.delete({ where: { id } })
    }

    public async deleteAll(): Promise<void> {
        await this.orderModel.deleteMany()
    }

}