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

        const product = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
            created_at: date,
            updated_at: date
        }

        const createdOrderProduct = {
            id: 1,
            quantidade: 1,
            id_produto: 1,
            produto: product
        }

        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            findById: jest.fn().mockReturnValue(Promise.resolve(product)),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        const mockOrderProductRepository = {
            create: jest.fn().mockReturnValue(createdOrderProduct)
        }

        //@ts-expect-error defined part of methods
        service = new UpdateOrder(mockOrderRepository, mockClientRepository, mockProductRepository, mockOrderProductRepository)

        const request = {
            ids_produtos: [{
                id: 1,
                quantidade: 1
            }],
            valor: new Decimal(10.50),
            status: 1,
            data: date,
            id_cliente: 1
        }

        const result = await service.execute(request, 1)

        expect(mockOrderRepository.exists).toBeCalled()
        expect(mockOrderRepository.update).toBeCalled()
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockProductRepository.findById).toBeCalled()
        expect(mockProductRepository.update).toBeCalled()
        expect(mockOrderProductRepository.create).toBeCalled()
    })

    it("should fail due to not found client", async () => {

        const mockOrderRepository = {
            exists:jest.fn().mockReturnValue(Promise.resolve(true))
        }
        
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrderRepository, mockClientRepository, {}, {})

        const request = {
            ids_produtos: [{
                id: 1,
                quantidade: 1
            }],
            valor: new Decimal(10.50),
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request,1)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockOrderRepository.exists).toBeCalled()
    })

    it("should fail due to not found product", async () => {
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
        }

        const mockOrderRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrderRepository, mockClientRepository, mockProductRepository, {})

        const request = {
            ids_produtos: [{
                id: 1,
                quantidade: 1
            }],
            valor: new Decimal(10.50),
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request,1)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockOrderRepository.exists).toBeCalled()
    })

    it("should fail due to not enough products in the stock", async () => {
        const product = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 5,
            created_at: date,
            updated_at: date
        }

        const mockOrdersRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            findById: jest.fn().mockReturnValue(Promise.resolve(product))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrdersRepository, mockClientRepository, mockProductRepository, {})

        const request = {
            ids_produtos: [{
                id: 1,
                quantidade: 6
            }],
            valor: new Decimal(10.50),
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request,1)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockOrdersRepository.exists).toBeCalled()
    })

    it('should fail due to not found order', async () => {
        const mockOrdersRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new UpdateOrder(mockOrdersRepository, {}, {}, {})

        const request = {
            ids_produtos: [{
                id: 1,
                quantidade: 6
            }],
            valor: new Decimal(10.50),
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request,2)).rejects.toBeInstanceOf(AppError)
        expect(mockOrdersRepository.exists).toBeCalled()
    })


})