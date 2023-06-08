import { createContext, useContext, useState } from "react";
import { api } from "../../services/api";
import { OrderContext } from "../order";
import { toast } from "react-toastify";
import {  AxiosResponse } from "axios";
import {
   dataDelete,
   iDefaultProviderProps,
   iProductCreate,
   iProducts,
   iProductsContext,
   iProductsUpdate,
} from "./@types";

export const ProductsContext = createContext({} as iProductsContext);

export const ProductsProvide = ({ children }: iDefaultProviderProps) => {
   const { page } = useContext(OrderContext);

   const [products, setProducts] = useState<iProducts[]>([]);

   const getProducts = async () => {
      try {
         const response: AxiosResponse<iProducts[]> = await api.get(
            `/products?page=${page}&perPage=20&id=DESC`
         );

         setProducts(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   const deleteProducts = async (data: dataDelete) => {
      const { massDelete } = data;

      try {
         const response = await api.put(`/products`, data);

         const newOrderList = products.filter(
            (products: iProducts) => products.id !== massDelete
         );

         setProducts(newOrderList);
      } catch (error) {
         console.error(error);
      }
   };

   const editProducts = async (data: iProductsUpdate,id:number) => {


      try {
         const response: AxiosResponse<iProducts> = await api.patch(
            `/products/${id}`,
            data
         );

         const newProductsList = products.map((product) => {
            if (product.id == id) {
               return { ...product, ...response.data };
            } else {
               return product;
            }
         });

         setProducts(newProductsList);

         toast.success("Produto editado com sucesso");
      } catch (error) {
         console.error(error);
      }
   };

   const createProducts = async (data: iProductCreate) => {
      try {
         const response: AxiosResponse<iProducts> = await api.post(
            "/products",
            data
         );

         setProducts([...products, response.data]);

         toast.success("Produto Criado com sucesso");
      } catch (error) {
         console.error(error);
      }
   };


   return (
      <ProductsContext.Provider
         value={{ products, getProducts, deleteProducts,editProducts,createProducts }}
      >
         {children}
      </ProductsContext.Provider>
   );
};
