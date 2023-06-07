export interface iDefaultProviderProps {
   children: React.ReactNode;
}
export interface dataDelete {
   massDelete:number
}


export interface iProducts{
   id: number,
   title_product: string,
   sku_product: string,
   price_product: string,
   stock_product: number,
   createdAt: string,
   updatedAt: string,
   product_order_id: number
}

export interface iProductsContext {
   getProducts: () => Promise<void>
   products: iProducts[]
   deleteProducts: (data: dataDelete) => Promise<void>
}