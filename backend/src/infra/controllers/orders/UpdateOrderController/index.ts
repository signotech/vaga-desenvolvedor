import { UpdateOrder } from "@implementation/use-cases/orders/UpdateOrder";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class UpdateOrderController{


    public async handle(req:Request, res:Response):Promise<Response>{

        const {id} = req.params
        const body = req.body

        const service = container.resolve(UpdateOrder)

        await service.execute(body, Number(id))

        return res.status(200).json()

    }

}