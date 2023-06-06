import { createContext, useState } from "react";
import { iDashboardPageContext, iDefaultProviderProps } from "./@types";


export const DashboardPageContext = createContext({} as iDashboardPageContext);

export const DashboardPageProvide = ({ children }: iDefaultProviderProps) => {

   const [selectList,setSelectList] = useState<string>('orders')

   return (
      <DashboardPageContext.Provider
         value={{selectList,setSelectList}}
      >
         {children}
      </DashboardPageContext.Provider>
   );
};
