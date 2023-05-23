import { UpdateClient } from "@implementation/use-cases/clients/UpdateClient";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class UpdateClientController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body
        const {id} = req.params

        const service = container.resolve(UpdateClient)

        await service.execute(body, Number(id))

        return res.status(204).json()
    }

}