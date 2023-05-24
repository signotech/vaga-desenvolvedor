import { CreateOrderProductDTO } from "@domain/dto/orders/CreateOrderProductDTO";
import { OrderProduct } from "@domain/entities/OrderProduct";

export interface IOrderProductRepository{
    create(data: CreateOrderProductDTO):Promise<OrderProduct>
}