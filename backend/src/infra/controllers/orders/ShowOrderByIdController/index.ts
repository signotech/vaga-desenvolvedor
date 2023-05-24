import { ShowOrderById } from "@implementation/use-cases/orders/ShowOrderById";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class ShowOrderByIdController{

    public async handle(req:Request, res:Response):Promise<Response>{
        const {id} = req.params

        const service = container.resolve(ShowOrderById)

        const order = await service.execute(Number(id))

        return res.status(200).json(order)
    }

}