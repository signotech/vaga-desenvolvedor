import { Decimal } from "@prisma/client/runtime/binary"

export interface Product {

    id:number
    titulo:string
    preco:Decimal
    estoque:number
    sku: string
    created_at:Date
    updated_at:Date
}