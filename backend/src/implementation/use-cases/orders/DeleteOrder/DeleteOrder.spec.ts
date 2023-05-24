import 'reflect-metadata'
import { AbstractDeleteOrder } from "@domain/use-cases/orders/AbstractDeleteOrder"
import { AppError } from "@presentation/errors/AppError"
import { DeleteOrder } from '.'

describe("DeleteOrder", () => {

    let service: AbstractDeleteOrder

    it("should delete the order with the informed id", async () => {

        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            delete: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteOrder(mockOrderRepository)

        await service.execute(1)

        expect(mockOrderRepository.delete).toBeCalled()
        expect(mockOrderRepository.exists).toBeCalled()
    })

    it("should fail due to not found order", async () => {
        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
            delete: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteOrder(mockOrderRepository)

        await expect(service.execute(2)).rejects.toBeInstanceOf(AppError)
        expect(mockOrderRepository.exists).toBeCalled()
        expect(mockOrderRepository.delete).not.toBeCalled()

    })

})