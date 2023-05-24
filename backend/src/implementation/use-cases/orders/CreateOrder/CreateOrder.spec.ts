import 'reflect-metadata'
import { AbstractCreateOrder } from "@domain/use-cases/orders/AbstractCreateOrder"
import { Decimal } from "@prisma/client/runtime/binary"
import { AppError } from '@presentation/errors/AppError'
import { CreateOrder } from '.'

describe("CreateOrder", () => {

    let service: AbstractCreateOrder
    let date: Date

    it("should create a new order", async () => {
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

        const expectedOutput = {
            id: 1,
            data: date,
            valor: 10.50,
            status: "ABERTO",
            JoinOrdersProducts: [{
                product: createdOrderProduct
            }],
            client: {}
        }

        const mockOrderRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
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
        service = new CreateOrder(mockOrderRepository, mockClientRepository, mockProductRepository, mockOrderProductRepository)

        const request = {
            ids_produtos: [{
                id:1,
                quantidade:1
            }],
            status: 0,
            data: date,
            id_cliente: 1
        }

        const result = await service.execute(request)

        expect(mockOrderRepository.create).toBeCalled()
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockProductRepository.findById).toBeCalled()
        expect(mockProductRepository.update).toBeCalled()
        expect(mockOrderProductRepository.create).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)
    })

    it("should fail due to not found client", async () => {
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new CreateOrder({}, mockClientRepository, {}, {})

        const request = {
            ids_produtos: [{
                id:1,
                quantidade: 1
            }],
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
    })

    it("should fail due to not found product", async () => {
        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
        }

        //@ts-expect-error defined part of methods and repositories
        service = new CreateOrder({}, mockClientRepository, mockProductRepository, {})

        const request = {
            ids_produtos: [{
                id:1,
                quantidade: 1
            }],
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
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

        const mockClientRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true))
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            findById: jest.fn().mockReturnValue(Promise.resolve(product))
        }

        //@ts-expect-error defined part of methods and repositories
        service = new CreateOrder({}, mockClientRepository, mockProductRepository, {})

        const request = {
            ids_produtos: [{
                id:1,
                quantidade: 6
            }],
            status: 0,
            data: date,
            id_cliente: 1
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockClientRepository.exists).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()
    })


})