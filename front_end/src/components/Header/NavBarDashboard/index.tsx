import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import { ButtonNav } from "../../../styles/buttons";
import { UlStyled } from "./styled";
const NavBarDashboard = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);

   const opemMenu = () => {
      setMenuOpen(!isMenuOpen);
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
                     <ButtonNav>Produtos</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav>Clientes</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav>Pedidos</ButtonNav>
                  </li>
                  <li>
                     <ButtonNav>Sair</ButtonNav>
                  </li>
               </UlStyled>
            </div>
         </nav>

         <MobileMenu isMenuOpen={isMenuOpen} />
      </>
   );
};

export default NavBarDashboard;
