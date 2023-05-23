import { AbstractDeleteClient } from "@domain/use-cases/clients/AbstractDeleteClient"
import { DeleteClient } from "."
import { AppError } from "@presentation/errors/AppError"

describe("DeleteClient", () => {

    let service: AbstractDeleteClient

    it("should delete the client with the informed id", async () => {

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            delete: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteClient(mockClientRepository)

        await service.execute(1)

        expect(mockClientRepository.exists).toBeCalled()
        expect(mockClientRepository.delete).toBeCalled()
    })

    it("should fail due to not found client", async () => {

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods
        service = new DeleteClient(mockClientRepository)

        await expect(service.execute(2)).rejects.toBeInstanceOf(AppError)

        expect(mockClientRepository.exists).toBeCalled()

    })

})