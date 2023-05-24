import { DeleteOrder } from "@implementation/use-cases/orders/DeleteOrder";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteOrderController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const {id} = req.params

        const service = container.resolve(DeleteOrder)

        await service.execute(Number(id))

        return res.status(204).json()

    }

}