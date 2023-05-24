import { DeleteAllOrders } from "@implementation/use-cases/orders/DeleteAllOrders";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteAllOrdersController{

    public async handle(req:Request, res:Response):Promise<Response>{
        const service = container.resolve(DeleteAllOrders)

        await service.execute()

        return res.status(204).json()
    }

}