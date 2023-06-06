import { createContext, useEffect, useState } from "react";
import {  iDefaultProviderProps, iOrders, iOrdersContext,  } from "./@types";
import { api } from "../../services/api";

export const OrderContext = createContext({} as iOrdersContext);

export const OrderProvide = ({ children }: iDefaultProviderProps) => {


   const [orders, setOrders] = useState<iOrders[]>([]);

   const getOrders = async () => {

      try {
         const response = await api.get('/order');

         setOrders(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <OrderContext.Provider value={{orders,getOrders}}>
         {children}
      </OrderContext.Provider>
   );
};
