import Dialog from "@mui/material/Dialog";
import React, { useContext, useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { iOrderCreate } from "../../../contexts/order/@types";
import { OrderContext } from "../../../contexts/order";
import { yupResolver } from "@hookform/resolvers/yup";
import Selects from "../../Form/Selects";
import { ClientsContext } from "../../../contexts/clients";
import Autocompletes from "../../Form/Autocomplete";
import { iClients } from "../../../contexts/clients/@types";
import { FormCreateStyled } from "./styled";
import { CreateOrderSchema } from "./validation";

interface iModalProps {
   opemModalOrder: boolean;
   setOpemModalOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateOrder = ({
   opemModalOrder,
   setOpemModalOrder,
}: iModalProps) => {
   const { createOrder,getOrders,orders } = useContext(OrderContext);
   const { clients } = useContext(ClientsContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iOrderCreate>({ resolver: yupResolver(CreateOrderSchema) });

   const modalClose = () => {
      setOpemModalOrder(!opemModalOrder);
   };

   const submit: SubmitHandler<iOrderCreate> = (data) => {

      const checkId =
         data.client_id !== undefined ? data.client_id.toString() : "";

      const clientId = clients.find(
         (client: iClients) => client.name_client == checkId
      );

      const orderCode = new Date().getMilliseconds();
      const orderDate = new Date().toLocaleDateString();

      const newData = {
         request_code: orderCode + 10000,
         request_date: orderDate,
         request_status: data.request_status,
         client_id: clientId?.id,
      };

      createOrder(newData);

      modalClose();
   };
   
   useEffect(() => {
   
      return () => {
         getOrders()
      };
   }, [orders]); 

   return (
      <>
         <Dialog
            open={opemModalOrder}
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
         >

            <FormCreateStyled onSubmit={handleSubmit(submit)}>
            <h3 className="Title Modal">Cadastrar Cliente</h3>
               <Selects
                  id="request_status"
                  label="Status do pedido"
                  labelId="request_status-label"
                  register={register("request_status")}
               />

               <Autocompletes register={register("client_id")} data={clients} />

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

export default ModalCreateOrder;
