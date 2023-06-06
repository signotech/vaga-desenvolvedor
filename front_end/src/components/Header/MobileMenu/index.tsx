import { Link } from "react-router-dom";
import { UlStyled } from "./styled";

interface iMenuOpenProps  {
   isMenuOpen:boolean
}
const MobileMenu = ({isMenuOpen}:iMenuOpenProps) => {

   return (
      <UlStyled
         className={` ${isMenuOpen ? "sidenav-open" : "sidenav"}`}
         id="mobile-nav"
      >
         <li>
            <Link to="/dashboard">Clientes</Link>
         </li>
         <li>
            <Link to="/profile">Produtos</Link>
         </li>
         <li>
            <Link to="/settings">Nº Pedido </Link>
         </li>
      </UlStyled>
   );
};

export default MobileMenu