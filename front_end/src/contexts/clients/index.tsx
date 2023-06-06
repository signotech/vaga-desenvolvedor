import { createContext, useState } from "react";
import { iClients, iClientsContext, iDefaultProviderProps } from "./@types";
import { api } from "../../services/api";

export const ClientsContext = createContext({} as iClientsContext);

export const ClientsProvide = ({ children }: iDefaultProviderProps) => {

   const [clients, setClients] = useState<iClients[]>([]);
   const [pageClients, setPageClients] = useState<string>("1");


   const getClients = async () => {
      try {
         const response = await api.get(
            `/client?page=${pageClients}&perPage=20`
         );

         setClients(response.data);
      } catch (error) {
         console.error(error);
      }
   };


   return (
      <ClientsContext.Provider
         value={{
            clients,
            getClients,
            setPageClients,
            pageClients
         }}
      >
         {children}
      </ClientsContext.Provider>
   );
};
