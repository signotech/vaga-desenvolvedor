import 'reflect-metadata'
import { AbstractUpdateClient } from "@domain/use-cases/clients/AbstractUpdateClient"
import { UpdateClient } from "."
import { AppError } from "@presentation/errors/AppError"

describe("UpdateClient", () => {

    let service: AbstractUpdateClient

    it("should update the data of the client", async () => {

        const clientBeforeUpdate= {
            id:1,
            nome: "fake-nome",
            email: "fake@gmail.com",
            cpf: "11122233345"
        }

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            emailIsRegistered: jest.fn().mockReturnValue(Promise.resolve(clientBeforeUpdate)),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        const request = {
            nome: "fake-nome-updated",
            email: "fake-updated@gmail.com",
            cpf: "11122233344"
        }

        //@ts-expect-error defined part of methods
        service = new UpdateClient(mockClientRepository)

        const result = await service.execute(request, 1)

        expect(mockClientRepository.exists).toBeCalled()
        expect(mockClientRepository.emailIsRegistered).toBeCalled()
        expect(mockClientRepository.update).toBeCalled()

    })

    it("should fail due to not found client", async () => {
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
        }

        const request = {
            nome: "fake-nome-updated",
            email: "fake-updated@gmail.com",
            cpf: "11122233344"
        }

        //@ts-expect-error defined part of methods
        service = new UpdateClient(mockClientRepository)


        await expect(service.execute(request, 2)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()

    })

    it("should fail due to email already registered to another client", async () => {

        const clientFoundWithEmail = {
            id:2,
            nome: "fake-nome",
            email: "fake-updated@gmail.com",
            cpf: "11122233345"

        }
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            emailIsRegistered: jest.fn().mockReturnValue(Promise.resolve(clientFoundWithEmail)),
        }

        const request = {
            nome: "fake-nome-updated",
            email: "fake-updated@gmail.com",
            cpf: "11122233344"
        }
        //@ts-expect-error defined part of methods
        service = new UpdateClient(mockClientRepository)

        await expect(service.execute(request, 1)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockClientRepository.emailIsRegistered).toBeCalled()
    })


})