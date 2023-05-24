import { Product } from "./Product"

export interface OrderProduct{
    id:number
    quantidade:number
    id_produto:number 
    product:Product 
}