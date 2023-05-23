import { CreateProduct } from "@implementation/use-cases/products/CreateProduct";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class CreateProductController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body

        const service = container.resolve(CreateProduct)

        const product = await service.execute(body)

        return res.status(201).json(product)

    }

}