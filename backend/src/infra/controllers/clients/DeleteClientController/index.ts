import { DeleteClient } from "@implementation/use-cases/clients/DeleteClient";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class DeleteClientController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const {id}=  req.params

        const service = container.resolve(DeleteClient)

        await service.execute(Number(id))

        return res.status(204).json()

    }

}