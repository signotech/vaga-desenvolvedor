import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { iOrderUpdate } from "../../../contexts/order/@types";
import { EditOrderSchema } from "./validation";
import { OrderContext } from "../../../contexts/order";
import { FormOrderStyled } from "./styled";
import Selects from "../Selects";

interface iFormProps {
   id: number;
   modalClose: () => void;
}
const FormEditOrder = ({ id, modalClose }: iFormProps) => {
   const { editOrders } = useContext(OrderContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iOrderUpdate>({ resolver: yupResolver(EditOrderSchema) });

   const submit: SubmitHandler<iOrderUpdate> = (data) => {
      editOrders(data, id);

      modalClose();
   };

   return (
      <FormOrderStyled onSubmit={handleSubmit(submit)}>
         <h2 className="Title Modal"> Editar Status do pedido</h2>
         <Selects
            id="request_status"
            label="Status do pedido"
            labelId="request_status-label"
            register={register("request_status")}
         />
         <DialogActions>
            <Button onClick={modalClose} size="medium" variant="contained">
               Voltar
            </Button>
            <Button
               color="success"
               size="medium"
               variant="contained"
               type="submit"
            >
               Editar
            </Button>
         </DialogActions>
      </FormOrderStyled>
   );
};

export default FormEditOrder;
