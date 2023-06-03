import FormLogin from "../../components/Form/FormLogin";
import NavBarLogin from "../../components/Header/NavBarLogin";

const LoginPage = () => {
   return (
      <>
         <header>
            <NavBarLogin />
         </header>

         <main className="container max-width-1200">
            <FormLogin />
         </main>
      </>
   );
};

export default LoginPage;
