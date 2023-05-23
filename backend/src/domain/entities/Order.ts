import { Decimal } from "@prisma/client/runtime/binary"
import { Client } from "./Client"
import { OrderProduct } from "@prisma/client"

export interface Order {

    id: number
    valor: Decimal
    desconto: number | null
    id_cliente: number | null
    status: number
    created_at: Date
    updated_at: Date

    JoinOrdersProducts: {
        product:OrderProduct | null
    }[]
    client: Client | null

}