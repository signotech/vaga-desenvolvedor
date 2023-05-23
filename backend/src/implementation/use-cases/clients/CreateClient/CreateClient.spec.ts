import { AbstractCreateClient } from "@domain/use-cases/clients/AbstractCreateClient"
import { CreateClient } from "."
import { AppError } from "@presentation/errors/AppError"

describe("CreateClient", () => {

    let service: AbstractCreateClient

    it("should create a new client", async () => {

        const expectedOutput = {
            id: 1,
            nome: "fake-nome",
            email: "fake@gmail.com",
            cpf: "11122233345"
        }

        const mockClientRepository = {
            emailIsRegistered: jest.fn().mockReturnValue(Promise.resolve(false)),
            create: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        const request = {
            nome: "fake-nome",
            email: "fake@gmail.com",
            cpf: "11122233345"

        }

        //@ts-expect-error defined part of methods
        service = new CreateClient(mockClientRepository)

        const result = await service.execute(request)

        expect(mockClientRepository.emailIsRegistered).toBeCalled()
        expect(mockClientRepository.create).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)
    })

    it("should fail due to already registered email", async () => {

        const mockClientRepository = {
            emailIsRegistered: jest.fn().mockReturnValue(Promise.resolve(true)),
        }

        const request = {
            nome: "fake-nome",
            email: "fake@gmail.com",
            cpf: "11122233345"

        }

        //@ts-expect-error defined part of methods
        service = new CreateClient(mockClientRepository)

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.emailIsRegistered).toBeCalled()
    })

})