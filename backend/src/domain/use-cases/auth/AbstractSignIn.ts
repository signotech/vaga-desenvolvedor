import { SignInDTO } from "@domain/dto/auth/SignInDTO";
import { AuthData } from "@domain/entities/AuthData";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractSignIn{

    protected abstract managerRepository:IManagerRepository

    abstract execute(data:SignInDTO):Promise<AuthData>

}