import 'dotenv/config'
import { AbstractValidateToken } from "@domain/use-cases/auth/AbstractValidateToken"
import { registerToken } from "../../../utils/register-token"
import { AppError } from "@presentation/errors/AppError"
import { ValidateToken } from "."

describe("ValidateToken", () => {

    let service: AbstractValidateToken

    it("should validate the token", async() => {

        service = new ValidateToken()

        const token = registerToken("fake-login")

        const result = await service.execute(token)

        expect(result).toBeTruthy()

    })

    it("should throw an error due to not valid token", async() => {

        service = new ValidateToken()

        const token = 'invalid-token'

        await expect(service.execute(token)).rejects.toBeInstanceOf(AppError)

    })

})