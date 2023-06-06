export interface iDefaultProviderProps {
   children: React.ReactNode;
}

export interface iOrdersContext {
   orders: iOrders[]
   getOrders: () => Promise<void>
   setPage: React.Dispatch<React.SetStateAction<string>>
   page: string
   deleteOrders: (data: dataDelete) => Promise<void>

}

export interface dataDelete {
   massDelete:number
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

