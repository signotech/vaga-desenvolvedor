import 'reflect-metadata'
import { AbstractDeleteAllOrders } from "@domain/use-cases/orders/AbstractDeleteAllOrders"
import { DeleteAllOrders } from '.'

describe("DeleteAllOrders", () => {

    let service:AbstractDeleteAllOrders

    it("should delete all orders", async() => {

        const mockOrderRepository = {
            deleteAll: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteAllOrders(mockOrderRepository)

        await service.execute()

        expect(mockOrderRepository.deleteAll).toBeCalled()
    })

})