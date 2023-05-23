import 'reflect-metadata'
import { DeleteAllClients } from "."

describe("DeleteAllClients", () => {

    it("should delete all clients", async() => {

        const mockClientRepository = {
            deleteAll: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        const service = new DeleteAllClients(mockClientRepository)

        await service.execute()

        expect(mockClientRepository.deleteAll).toBeCalled()
    })

})