import { ShowClientById } from "@implementation/use-cases/clients/ShowClientById";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class ShowClientByIdController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const {id}= req.params

        const service = container.resolve(ShowClientById)

        const client = await service.execute(Number(id))

        return res.status(200).json(client)

    }

}