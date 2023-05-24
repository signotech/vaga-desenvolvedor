import { Decimal } from "@prisma/client/runtime/binary"

export interface UpdateOrderDTO{
    valor?: Decimal
    desconto?: number
    data?: Date
    id_cliente?:number
    status?:number
}