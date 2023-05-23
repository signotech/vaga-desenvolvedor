import { SignIn } from "@implementation/use-cases/auth/SignIn";
import { container } from "@presentation/container";
import { Request, Response } from "express";

export class SignInController {

    public async handle(req:Request, res:Response):Promise<Response>{

        const body = req.body

        const service = container.resolve(SignIn)

        const result = await service.execute(body)

        return res.status(200).json(result)

    }

}