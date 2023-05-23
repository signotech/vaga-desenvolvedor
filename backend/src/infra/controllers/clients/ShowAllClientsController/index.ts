import { ShowAllClients } from "@implementation/use-cases/clients/ShowAllClients";
import { container } from "@presentation/container";
import { AppError } from "@presentation/errors/AppError";
import { Request, Response } from "express";

export class ShowAllClientsController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const {skip, take} = req.query 

        const service = container.resolve(ShowAllClients)

        const clients = await service.execute({skip: Number(skip),take: Number(take)})

        return res.status(200).json(clients)

    }

}