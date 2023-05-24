import { Decimal } from "@prisma/client/runtime/binary"

export interface CreateOrderDTO{
    ids_produtos: number[],
    valor: Decimal
    desconto?: number
    status:number
    data: Date
    id_cliente:number
}