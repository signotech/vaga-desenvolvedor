import { Product } from "./Product"

export interface OrderProduct{
    id:number
    quantidade:number
    id_produto:number | null
    product:Product | null
}