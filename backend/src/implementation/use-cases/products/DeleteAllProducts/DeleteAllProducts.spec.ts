import { AbstractDeleteAllProducts } from '@domain/use-cases/products/AbstractDeleteAllProducts'
import 'reflect-metadata'
import { DeleteAllProducts } from '.'

describe('DeleteAllProducts', () => {

    let service:AbstractDeleteAllProducts

    it("should delete all products", async() => {

        const mockProductRepository = {
            deleteAll: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteAllProducts(mockProductRepository)

        await service.execute()

        expect(mockProductRepository.deleteAll).toBeCalled()

    })


})