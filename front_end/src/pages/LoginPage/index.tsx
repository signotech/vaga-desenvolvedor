import FormLogin from "../../components/Form/FormLogin";
import NavBarLogin from "../../components/Header/NavBarLogin";
import LoginDescription from "../../components/LoginDescription";
import { MainStyled } from "./styled";

const LoginPage = () => {
   return (
      <>
         <header>
            <NavBarLogin />
         </header>

         <MainStyled className="container max-width-1200">
            <LoginDescription></LoginDescription>
            <FormLogin />
         </MainStyled>
      </>
   );
};

export default LoginPage;
