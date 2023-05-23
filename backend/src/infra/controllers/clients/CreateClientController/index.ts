import { CreateClient } from "@implementation/use-cases/clients/CreateClient";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class CreateClientController{

    async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body

        const service = container.resolve(CreateClient)

        const client = await service.execute(body)

        return res.status(201).json(client)

    }

}