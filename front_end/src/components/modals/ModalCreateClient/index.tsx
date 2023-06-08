import Dialog from "@mui/material/Dialog";
import React, { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ClientsContext } from "../../../contexts/clients";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Inputs from "../../Form/Inputs";
import { iClientCreate} from "../../../contexts/clients/@types";
import { CreateSchema } from "./validation";
import { FormCreateStyled } from "./styled";

interface iModalProps {
   opemModalCreate: boolean;
   setOpemModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
}


const ModalCreateClient = ({
   opemModalCreate,
   setOpemModalCreate,
}: iModalProps) => {

   const { createClients} = useContext(ClientsContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iClientCreate>({ resolver: yupResolver(CreateSchema) });

   const modalClose = () => {
      setOpemModalCreate(!opemModalCreate);
   };

   const submit: SubmitHandler<iClientCreate> = (data) => {

      createClients(data)

      modalClose();
   };

   return (
      <>
         <Dialog
            open={opemModalCreate}
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
         >
            <h3 className="Title Modal">Cadastrar Cliente</h3>

            <FormCreateStyled onSubmit={handleSubmit(submit)}>
               <Inputs
                  type="text"
                  label="Nome:"
                  id="name_client"
                  error={errors.name_client}
                  register={register("name_client")}
               />
               <Inputs
                  type="text"
                  label="CPF:"
                  id="cpf_client"
                  register={register("cpf_client")}
                  error={errors.cpf_client}
               />
               <Inputs
                  type="text"
                  label="Email:"
                  id="email_client"
                  register={register("email_client")}
                  error={errors.email_client}
               />

               <DialogActions>
                  <Button
                     onClick={modalClose}
                     size="medium"
                     variant="contained"
                  >
                     Voltar
                  </Button>
                  <Button
                     color="success"
                     size="medium"
                     variant="contained"
                     type="submit"
                  >
                     Cadastrar
                  </Button>
               </DialogActions>
            </FormCreateStyled>
         </Dialog>
      </>
   );
};

export default ModalCreateClient;
