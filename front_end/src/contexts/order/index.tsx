import { createContext, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import {
   dataDelete,
   iDefaultProviderProps,
   iOrderCreate,
   iOrderUpdate,
   iOrders,
   iOrdersContext,
} from "./@types";

export const OrderContext = createContext({} as iOrdersContext);

export const OrderProvide = ({ children }: iDefaultProviderProps) => {
   const [orders, setOrders] = useState<iOrders[]>([]);
   const [page, setPage] = useState<string>("1");

   const getOrders = async () => {
      try {
         const response: AxiosResponse<iOrders[]> = await api.get(
            `/order?page=${page}&perPage=20&id=DESC`
         );

         setOrders(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   const deleteOrders = async (data: dataDelete) => {
      const { massDelete } = data;

      try {
         const response = await api.put(`/order`, data);

         const newOrderList = orders.filter(
            (order: iOrders) => order.id !== massDelete
         );

         setOrders(newOrderList);
      } catch (error) {
         console.error(error);
      }
   };

   const editOrders = async (data: iOrderUpdate,id:number) => {

      try {
         const response: AxiosResponse<iOrders> = await api.patch(
            `/order/${id}`,
            data
         );

         const newOrderList = orders.map((order) => {
            if (order.id == id) {
               return { ...order, ...response.data };
            } else {
               return order;
            }
         });

         setOrders(newOrderList);

         toast.success("Pedido editado com sucesso");
      } catch (error) {
         console.error(error);
      }
   };

   const createOrder = async (data: iOrderCreate) => {

      try {
         const response: AxiosResponse<iOrders> = await api.post(
            "/order",
            data
         );

         setOrders([...orders, response.data]);

         toast.success("Pedido cadastrado com sucesso");
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <OrderContext.Provider
         value={{
            orders,
            getOrders,
            setPage,
            page,
            deleteOrders,
            editOrders,
            createOrder,
         }}
      >
         {children}
      </OrderContext.Provider>
   );
};
