import { UpdateProduct } from "@implementation/use-cases/products/UpdateProduct";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class UpdateProductController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const {id} = req.params
        const body = req.body

        const service = container.resolve(UpdateProduct)

        await service.execute(body, Number(id))

        return res.status(204).json()

    }

}