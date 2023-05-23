import { DeleteAllProducts } from "@implementation/use-cases/products/DeleteAllProducts";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteAllProductsController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const service = container.resolve(DeleteAllProducts)

        await service.execute()

        return res.status(204).json()

    }

}