export interface iDefaultProviderProps {
   children: React.ReactNode;
}


export interface iClientsContext {
   clients: iClients[]
   getClients: () => Promise<void>
}

export interface iClients {
   id:number
   name_client:string
   cpf_client:string
   email_client:string
   createdAt:string
   updatedAt:string
}

