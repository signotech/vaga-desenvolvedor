import { createContext, useState } from "react";
import { IloginContext, iDefaultProviderProps, iUser, iUserLogin } from "./@types";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const LoginContext = createContext({} as IloginContext);

export const LoginProvider = ({ children }: iDefaultProviderProps) => {

   
   const [user, setUser] = useState<iUser | null>(null);


   const userLogin = async (data: iUserLogin) => {
         console.log(data)
      try {
         const response = await api.post('/login', data);

         setUser(response.data.user);

         toast.success("Login realizado com sucesso")

         localStorage.setItem('@Hamburgueria:Token', response.data.accessToken);
      } catch (error) {
         console.error(error);
         toast.error("Usuario ou senha incorretos")
      }
   };


   return (
      <LoginContext.Provider value={{ userLogin }}>
         {children}
      </LoginContext.Provider>
   );
};

