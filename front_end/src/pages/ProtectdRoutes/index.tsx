import { useContext } from "react";
import { LoginContext } from "../../contexts/login";
import { Navigate, Outlet } from "react-router-dom";
import PreLoad from "../../components/PreLoad";

const ProtectedRoutes = () => {
   const { user, load } = useContext(LoginContext);

   return !user ? (
      <> {!load ? <PreLoad /> : <Navigate to="/" />} </>
   ) : (
      <Outlet />
   );
};

export default ProtectedRoutes;
