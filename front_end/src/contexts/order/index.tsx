import { createContext, useState } from "react";
import {  dataDelete, iDefaultProviderProps, iOrders, iOrdersContext,  } from "./@types";
import { api } from "../../services/api";

export const OrderContext = createContext({} as iOrdersContext);

export const OrderProvide = ({ children }: iDefaultProviderProps) => {


   const [orders, setOrders] = useState<iOrders[]>([]);
   const [page,setPage] = useState<string>('1')

   const getOrders = async () => {

      try {
         const response = await api.get(`/order?page=${page}&perPage=20`);

         setOrders(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   const deleteOrders = async (data:dataDelete) => {

      const {massDelete} = data
      
      try {

         const response = await api.put(`/order`,data);
         
         const newOrderList = orders.filter((order:iOrders) => order.id !== massDelete);
         
         setOrders(newOrderList);

      } catch (error) {
         console.error(error);
      }
   };

   return (
      <OrderContext.Provider value={{orders,getOrders,setPage,page,deleteOrders,}}>
         {children}
      </OrderContext.Provider>
   );
};
