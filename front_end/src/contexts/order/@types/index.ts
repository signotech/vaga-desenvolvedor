export interface iDefaultProviderProps {
   children: React.ReactNode;
}

export interface iOrdersContext {
   orders: iOrders[]
   getOrders: () => Promise<void>
   setPage: React.Dispatch<React.SetStateAction<string>>
   page: string
   deleteOrders: (data: dataDelete) => Promise<void>
   editOrders: (data: iOrderUpdate, id: number) => Promise<void>
   createClients: (data: iOrderCreate) => Promise<void>

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
export interface iOrderUpdate {
   id:number
   request_status:string
}
export interface iOrderCreate {
   request_status:string
   client_id:number
   request_code:number
   request_date:string
}

