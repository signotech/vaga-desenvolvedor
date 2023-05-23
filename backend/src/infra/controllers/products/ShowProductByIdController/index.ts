import { ShowProductById } from "@implementation/use-cases/products/ShowProductById";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class ShowProductByIdController {

    public async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params

        const service = container.resolve(ShowProductById)

        const product = await service.execute(Number(id))

        return res.status(200).json(product)

    }

}