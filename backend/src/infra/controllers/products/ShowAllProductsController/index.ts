import { ShowAllProducts } from "@implementation/use-cases/products/ShowAllProducts";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class ShowAllProductsController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const {skip, take} = req.query

        const service = container.resolve(ShowAllProducts)

        const products = await service.execute({skip: Number(skip), take: Number(take)})

        return res.status(200).json(products)

    }

}