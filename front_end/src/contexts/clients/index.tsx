import { createContext, useState } from "react";
import { api } from "../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
   dataDelete,
   iClientCreate,
   iClientUpdate,
   iClients,
   iClientsContext,
   iDefaultProviderProps,
} from "./@types";

export const ClientsContext = createContext({} as iClientsContext);

export const ClientsProvide = ({ children }: iDefaultProviderProps) => {
   
   const [clients, setClients] = useState<iClients[]>([]);
   const [pageClients, setPageClients] = useState<string>("1");

   const getClients = async () => {
      try {
         const response = await api.get(
            `/client?page=${pageClients}&perPage=20&id=DESC`
         );

         setClients(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   const deleteClients = async (data: dataDelete) => {
      const { massDelete } = data;

      try {
         const response = await api.put(`/client`, data);

         const newOrderList = clients.filter(
            (client: iClients) => client.id !== massDelete
         );

         setClients(newOrderList);
      } catch (error) {
         console.error(error);
      }
   };

   const editClient = async (data: iClientUpdate,id:number) => {

      try {
         const response: AxiosResponse<iClients> = await api.patch(
            `/client/${id}`,
            data
         );

         const newOrderList = clients.map((client) => {
            if (client.id == id) {
               return { ...client, ...response.data };
            } else {
               return client;
            }
         });
         setClients(newOrderList);

         toast.success("Cliente editado com sucesso");
      } catch (error) {
         console.error(error);
      }
   };

   const createClients = async (data:iClientCreate) => {


      try {
         const response:AxiosResponse<iClients> = await api.post("/client", data);

         setClients([...clients, response.data]);

         toast.success("Cliente cadastrado com sucesso")
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
            pageClients,
            deleteClients,
            createClients,
            editClient,
            setClients
         }}
      >
         {children}
      </ClientsContext.Provider>
   );
};
