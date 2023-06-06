export interface iDefaultProviderProps {
   children: React.ReactNode;
}

export interface iOrdersContext {
   orders: iOrders[]
   getOrders: () => Promise<void>
}

export interface iOrders {
   id:number
   request_code:number
   request_date:string
   request_status:string
   createdAt:string
   updatedAt:string
   client_id:number
}

