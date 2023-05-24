import 'reflect-metadata'
import { AbstractUpdateOrder } from "@domain/use-cases/orders/AbstractUpdateOrder"
import { Decimal } from "@prisma/client/runtime/binary"
import { AppError } from '@presentation/errors/AppError'
import { UpdateOrder } from '.'

describe("UpdateOrder", () => {

    let service: AbstractUpdateOrder
    let date: Date

    it("should update a existing order", async () => {
        date = new Date()

        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        //@ts-expect-error defined part of methods
        service = new UpdateOrder(mockOrderRepository, mockClientRepository)

        const request = {
            status: 1,
            data: date,
            id_cliente: 1
        }

        await service.execute(request, 1)

        expect(mockOrderRepository.exists).toBeCalled()
        expect(mockOrderRepository.update).toBeCalled()
        expect(mockClientRepository.exists).toBeCalled()
    })

    it("should fail due to not found client", async () => {

        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrderRepository, mockClientRepository)

        const request = {
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request, 1)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockOrderRepository.exists).toBeCalled()
    })

    it('should fail due to not found order', async () => {
        const mockOrdersRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrdersRepository, {})

        const request = {
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request, 2)).rejects.toBeInstanceOf(AppError)
        expect(mockOrdersRepository.exists).toBeCalled()
    })


})