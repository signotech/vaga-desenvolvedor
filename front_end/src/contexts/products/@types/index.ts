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
   price_product: number,
   stock_product: number,
   createdAt: string,
   updatedAt: string,
   product_order_id: number
}
export interface iProductsUpdate{
   id:number
   title_product?: string,
   sku_product?: string,
   price_product?: number,
   stock_product?: number,
}
export interface iProductCreate{
   title_product: string,
   sku_product: string,
   price_product: number,
   stock_product: number,
}

export interface iProductsContext {
   getProducts: () => Promise<void>
   products: iProducts[]
   deleteProducts: (data: dataDelete) => Promise<void>
   editProducts: (data: iProductsUpdate, id: number) => Promise<void>
   createProducts: (data: iProductCreate) => Promise<void>
}