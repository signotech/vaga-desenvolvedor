import { ShowAllOrders } from "@implementation/use-cases/orders/ShowAllOrders";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class ShowAllOrdersController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const {take, skip} = req.query

        const service = container.resolve(ShowAllOrders)

        const orders = await service.execute({take:Number(take), skip:Number(skip)})

        return res.status(200).json(orders)

    }

}