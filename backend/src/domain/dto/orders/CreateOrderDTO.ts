import { Decimal } from "@prisma/client/runtime/binary"

export interface CreateOrderDTO{
    ids_produtos: number[],
    valor: number
    desconto?: number
    status:number
    data: Date
    id_cliente:number
}