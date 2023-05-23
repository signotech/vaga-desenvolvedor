import { CreateOrderProductDTO } from "@domain/dto/orders/CreateOrderProductDTO";
import { OrdeProduct } from "@domain/entities/OrderProduct";

export interface IOrderProductRepository{

    create(data: CreateOrderProductDTO):Promise<OrdeProduct>
}