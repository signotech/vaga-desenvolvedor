import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Inputs from "../Inputs";
import { loginSchema } from "./validation";
import { useContext } from "react";
import { LoginContext } from "../../../contexts/login";
import { iUserLogin } from "../../../contexts/login/@types";

const FormLogin = () => {
   const { userLogin } = useContext(LoginContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iUserLogin>({ resolver: yupResolver(loginSchema) });

   const submit: SubmitHandler<iUserLogin> = (data) => {
      userLogin(data);
   };

      
   return (
      <form onSubmit={handleSubmit(submit)}>
         <Inputs
            type="email"
            label="Digite o seu E-mail"
            id="email_user"
            error={errors.email_user}
            register={register("email_user")}
         />
         <Inputs
            type="password"
            label="Digite a sua senha:"
            id="password_user"
            register={register("password_user")}
            error={errors.password_user}
         />

         <button type="submit">Login</button>
      </form>
   );
};

export default FormLogin;
