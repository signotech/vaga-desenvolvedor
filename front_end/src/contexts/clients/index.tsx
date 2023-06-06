import { createContext, useEffect, useState } from "react";
import { iClients, iClientsContext, iDefaultProviderProps } from "./@types";
import { api } from "../../services/api";

export const ClientsContext = createContext({} as iClientsContext);

export const ClientsProvide = ({ children }: iDefaultProviderProps) => {


   const [clients, setClients] = useState<iClients[]>([]);

   const getClients = async () => {

      try {
         const response = await api.get('/client');

         setClients(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getClients();
   }, []);



   return (
      <ClientsContext.Provider value={{clients,getClients }}>
         {children}
      </ClientsContext.Provider>
   );
};
