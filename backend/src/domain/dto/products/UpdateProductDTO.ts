import { Decimal } from "@prisma/client/runtime/binary"

export interface UpdateProductDTO{
    titulo?:string
    preco?:Decimal
    estoque?:number
    sku?: string

}
