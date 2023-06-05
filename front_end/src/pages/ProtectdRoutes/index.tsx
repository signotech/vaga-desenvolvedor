import { useContext } from "react";
import { LoginContext } from "../../contexts/login";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

   const { user } = useContext(LoginContext);
   
   return !user ?  <Navigate to='/'/> : <Outlet /> 

};

export default ProtectedRoutes