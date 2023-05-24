import { CreateOrder } from "@implementation/use-cases/orders/CreateOrder";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class CreateOrderController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body

        const service = container.resolve(CreateOrder)

        const order = await service.execute(body)

        return res.status(201).json(order)
    }

}