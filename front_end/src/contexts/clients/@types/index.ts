export interface iDefaultProviderProps {
   children: React.ReactNode;
}

export interface dataDelete {
   massDelete:number
}

export interface iClientsContext {
   clients: iClients[]
   pageClients: string
   getClients: () => Promise<void>
   setPageClients: React.Dispatch<React.SetStateAction<string>>
   deleteClients: (data: dataDelete) => Promise<void>
   createClients: (data: iClientCreate) => Promise<void>
   editClient: (data: iClientUpdate, id: number) => Promise<void>
   setClients: React.Dispatch<React.SetStateAction<iClients[]>>
}

export interface iClients {
   client_id: string;
   id:number
   name_client:string
   cpf_client:string
   email_client:string
   createdAt:string
   updatedAt:string
}

export interface iClientUpdate {
   id:number
   name_client?:string
   cpf_client?:string
   email_client?:string
}
export interface iClientCreate {
   name_client:string
   cpf_client:string
   email_client:string
}


