import { SectionStyled } from "./styled";
import sistemaDePedidos from "../../assets/sistemaDePedidos.svg"


const LoginDescription = () => {

   return (
      <SectionStyled>
         <div>
            <p className="description Login">
               Bem-vindo ao nosso sistema de gerenciamento de pedidos de compra.
               Por favor, faça login para acessar sua conta e iniciar o processo
               de cadastro de pedidos
            </p>

            <figcaption>
               <img src={sistemaDePedidos} alt="ilustração sistema de pedidos" />
            </figcaption>
         </div>
      </SectionStyled>
   );
};

export default LoginDescription;
