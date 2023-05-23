import { SignUp } from "@implementation/use-cases/auth/SignUp";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class SignUpController{

    public async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body

        const service = container.resolve(SignUp)

        const result = await service.execute(body)

        return res.status(201).json(result)

    }

}