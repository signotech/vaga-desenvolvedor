import { DeleteProduct } from "@implementation/use-cases/products/DeleteProduct";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteProductController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const {id} = req.params

        const service = container.resolve(DeleteProduct)

        await service.execute(Number(id))

        return res.status(204).json()

    }

}