import { createContext, useEffect, useState } from "react";
import { IloginContext, iDefaultProviderProps, iUser, iUserLogin } from "./@types";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const LoginContext = createContext({} as IloginContext);

export const LoginProvider = ({ children }: iDefaultProviderProps) => {

   const token = localStorage.getItem('@kaliSystem:token');


   const [user, setUser] = useState<iUser | null>(null);
   const navigate = useNavigate()

   useEffect(() => {

      if (token) {
         
         const autoLogin = async () => {
            
            const userid = jwt_decode<string>(token);

            try {
               const response = await api.get(`/login/${userid.sub}`);

               setUser(response.data);

               navigate('/Protected/Dashboard')

            } catch (error) {
               console.error(error);
            }
         };

         autoLogin();
      }
   }, []);


   const userLogin = async (data: iUserLogin) => {

      try {
         const response = await api.post('/login', data);

         setUser(JSON.parse(response.config.data));

         toast.success("Login realizado com sucesso")

         localStorage.setItem('@kaliSystem:token', response.data);

         navigate('/Protected/Dashboard')
         
      } catch (error) {
         console.error(error);
         toast.error("Usuario ou senha incorretos")
      }
   };

   const userLogout = () => {
      setUser(null);
      localStorage.clear();
      navigate('/');
   };

   return (
      <LoginContext.Provider value={{ userLogin,user,userLogout }}>
         {children}
      </LoginContext.Provider>
   );
};

