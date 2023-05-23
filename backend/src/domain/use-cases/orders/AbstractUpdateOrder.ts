import { UpdateOrderDTO } from "@domain/dto/orders/UpdateOrderDTO";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractUpdateOrder{

   protected abstract orderRepository:IOrderRepository
   protected abstract productRepository:IProductRepository
   protected abstract orderProductRepository:IOrderProductRepository

   abstract execute(data:UpdateOrderDTO):Promise<void>

}