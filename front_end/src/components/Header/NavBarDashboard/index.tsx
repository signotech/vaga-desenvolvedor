import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import { ButtonNav } from "../../../styles/buttons";
import { UlStyled } from "./styled";
import { DashboardPageContext } from "../../../contexts/dashboardPage";
import { LoginContext } from "../../../contexts/login";
const NavBarDashboard = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);

   const {userLogout} = useContext(LoginContext)

   const opemMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   const {setSelectList} = useContext(DashboardPageContext)

   const valueButton = (event:any) => {

      setSelectList(event.value);
   };


   return (
      <>
         <nav className="light-blue darken-4">
            <div className="nav-wrapper container max-width-1200">
               <Link to="/Protected/Dashboard" className="brand-logo">
                  Kali System
               </Link>
               <a
                  href="#!"
                  className="sidenav-trigger"
                  data-target="mobile-menu"
                  onClick={opemMenu}
               >
                  <i className=" Tiny material-icons ">
                     {isMenuOpen ? "close" : "drag_handle"}
                  </i>
               </a>

               <UlStyled className="right hide-on-med-and-down">
                  <li>
                     <ButtonNav  value="products" onClick={(event) => valueButton(event.target)}>Produtos</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav value="clients"  onClick={(event) => valueButton(event.target)}>Clientes</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav value="orders" onClick={(event) => valueButton(event.target)}>Pedidos</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav onClick={userLogout}>Sair</ButtonNav>
                  </li>
               </UlStyled>
            </div>
         </nav>

         <MobileMenu isMenuOpen={isMenuOpen} />
      </>
   );
};

export default NavBarDashboard;
