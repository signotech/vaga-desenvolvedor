import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateOrderDTO } from "@domain/dto/orders/CreateOrderDTO";
import { UpdateOrderDTO } from "@domain/dto/orders/UpdateOrderDTO";
import { Order } from "@domain/entities/Order";

export interface IOrderRepository{

    findAll(data:ShowAllDTO):Promise<Order[]>
    findById(id:number):Promise<Order | null>
    exists(id:number):Promise<boolean>
    create(data:CreateOrderDTO):Promise<Order>
    update(data:UpdateOrderDTO,id:number):Promise<void>
    delete(id:number):Promise<void>
    deleteAll():Promise<void>

}