import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Inputs from "../Inputs";
import { useContext } from "react";
import { FormClientStyled } from "./styled";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ClientsContext } from "../../../contexts/clients";
import { iClientUpdate } from "../../../contexts/clients/@types";
import { EditClientSchema } from "./validation";

interface iFormProps {
   id: number;
   modalClose: () => void
}
const FormEditClient = ({ id, modalClose}: iFormProps) => {

   const { editClient } = useContext(ClientsContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iClientUpdate>({ resolver: yupResolver(EditClientSchema)});

   const submit: SubmitHandler<iClientUpdate> = (data) => {
      
      editClient(data,id);
      
      modalClose()
   };

   return (
      <FormClientStyled onSubmit={handleSubmit(submit)}>
         <h2 className="Title Modal"> Editar Cliente</h2>
         <Inputs
            type="text"
            label="Nome:(opcional)"
            id="name_client"
            error={errors.name_client}
            register={register("name_client")}
         />
         <Inputs
            type="text"
            label="CPF:(opcional)"
            id="cpf_client"
            register={register("cpf_client")}
            error={errors.cpf_client}
         />
         <Inputs
            type="text"
            label="Email:(opcional)"
            id="email_client"
            register={register("email_client")}
            error={errors.email_client}
         />

         <DialogActions>
            <Button onClick={modalClose} size="medium" variant="contained">
               Voltar
            </Button>
            <Button color="success" size="medium" variant="contained" type="submit">
               Editar
            </Button>
         </DialogActions>
      </FormClientStyled>
   );
};

export default FormEditClient;
