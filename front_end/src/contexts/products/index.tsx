import { createContext, useContext, useState } from "react";
import { api } from "../../services/api";
import { iDefaultProviderProps, iProducts, iProductsContext } from "./@types";
import { OrderContext } from "../order";

export const ProductsContext = createContext({} as iProductsContext);

export const ProductsProvide = ({ children }: iDefaultProviderProps) => {

   const {page} = useContext(OrderContext)
   
   const [products, setProducts] = useState<iProducts[]>([]);

   const getProducts = async () => {

      try {
         const response = await api.get(`/products?page=${page}&perPage=20`);
         
         setProducts(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <ProductsContext.Provider value={{products,getProducts}}>
         {children}
      </ProductsContext.Provider>
   );
};
