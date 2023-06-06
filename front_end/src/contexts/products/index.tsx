import { createContext, useState } from "react";
import { api } from "../../services/api";
import { iDefaultProviderProps, iProducts, iProductsContext } from "./@types";

export const ProductsContext = createContext({} as iProductsContext);

export const ProductsProvide = ({ children }: iDefaultProviderProps) => {


   const [products, setProducts] = useState<iProducts[]>([]);

   const getProducts = async () => {

      try {
         const response = await api.get('/products');

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
