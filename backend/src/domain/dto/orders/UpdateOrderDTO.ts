import { Decimal } from "@prisma/client/runtime/binary"

export interface UpdateOrderDTO{
    ids_produtos?: number[]
    valor?: Decimal
    desconto?: number
    data?: Date
    id_cliente?:number
    status?:number
}