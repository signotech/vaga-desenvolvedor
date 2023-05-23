import { Decimal } from "@prisma/client/runtime/binary"

export interface CreateProductDTO{
    titulo:string
    preco:Decimal
    estoque:number
    sku: string

}