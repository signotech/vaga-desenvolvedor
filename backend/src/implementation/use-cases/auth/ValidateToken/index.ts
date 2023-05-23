import { AbstractValidateToken } from "@domain/use-cases/auth/AbstractValidateToken";
import { validateToken } from "../../../utils/validate-token";
import { AppError } from "@presentation/errors/AppError";

export class ValidateToken extends AbstractValidateToken{

    public async execute(token: string): Promise<boolean> {
        const tokenValidated = await validateToken(token)

        if(!tokenValidated){
            throw new AppError("Token inválido", 403)
        }

        return true
    }

}