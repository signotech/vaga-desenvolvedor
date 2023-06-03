import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PublicRoutes from "../pages/PublicRoutes";
// import ProtectedRoutes from "../pages/ProtectdRoutes";
// import DashboardPage from "../pages/DashboardPage";
// import InfoPage from "../pages/InfosPage";

const Router = () => (
   <Routes>
      <Route path="/" element={<PublicRoutes />}>
         <Route path="/" element={<LoginPage />} />
      </Route>

      {/* <Route path="/shop" element={<ProtectedRoutes />}>
         <Route index path="/Dashboard" element={<DashboardPage/>} />
         <Route index path="/infoPage" element={<InfoPage/>} />
      </Route> */}
   </Routes>
);

export default Router;
