import { validateToken } from "@implementation/utils/validate-token";
import { AppError } from "@presentation/errors/AppError";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async(req:Request, res:Response, next:NextFunction) => {

    const bearerAuth = req.headers.authorization

    if(!bearerAuth){
        throw new AppError("Token de autenticação não encontrado.", 403)
    }

    const token = bearerAuth.split(" ")[1]

    const tokenValidated = validateToken(token)

    if(!tokenValidated){
        throw new AppError("Token inválido", 403)
    }

    return next()

}