import { UlStyled } from "./styled";
import { ButtonNavMob } from "../../../styles/buttons";
import { useContext } from "react";
import { DashboardPageContext } from "../../../contexts/dashboardPage";
import { LoginContext } from "../../../contexts/login";

interface iMenuOpenProps {
   isMenuOpen: boolean;
}
const MobileMenu = ({ isMenuOpen }: iMenuOpenProps) => {
   
   const {userLogout} = useContext(LoginContext)

   const {setSelectList} = useContext(DashboardPageContext)

   const valueButton = (event:any) => {

      setSelectList(event.value);
   };

   return (
      <UlStyled
         className={` ${isMenuOpen ? "sidenav-open" : "sidenav"}`}
         id="mobile-nav"
      >
         <li>
            <ButtonNavMob value="products" onClick={(event) => valueButton(event.target)}>
               Produtos
            </ButtonNavMob>
         </li>
         <li>
            <ButtonNavMob value="clients" onClick={(event) => valueButton(event.target)}>
               Clientes
            </ButtonNavMob>
         </li>
         <li>
            <ButtonNavMob value="orders" onClick={(event) => valueButton(event.target)}>
               Pedidos
            </ButtonNavMob>
         </li>
         <li>
            <ButtonNavMob onClick={userLogout} >Sair</ButtonNavMob>
         </li>
      </UlStyled>
   );
};

export default MobileMenu;
