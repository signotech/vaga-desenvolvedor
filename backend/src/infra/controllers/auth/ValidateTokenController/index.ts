import { ValidateToken } from "@implementation/use-cases/auth/ValidateToken";
import { Request, Response } from "express";

export class ValidateTokenController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const {token} = req.body

        const service = new ValidateToken()

        const response = await service.execute(token)

        return res.status(200).json({
            valid: response
        })

    }

}