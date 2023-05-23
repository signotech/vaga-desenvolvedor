import { DeleteAllClients } from "@implementation/use-cases/clients/DeleteAllClients";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteAllClientsController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const service = await container.resolve(DeleteAllClients)

        await service.execute()

        return res.status(204).json()

    }

}