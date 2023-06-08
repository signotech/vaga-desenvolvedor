import Dialog from "@mui/material/Dialog";
import React, { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormCreateStyled } from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Inputs from "../../Form/Inputs";
import { iProductCreate } from "../../../contexts/products/@types";
import { ProductsContext } from "../../../contexts/products";
import { CreateProductSchema } from "./validation";
import { ClientsContext } from "../../../contexts/clients";
import Autocompletes from "../../Form/Autocomplete";
import { iClients } from "../../../contexts/clients/@types";
import { iOrders } from "../../../contexts/order/@types";
import { OrderContext } from "../../../contexts/order";

interface iModalProps {
   opemModalProduct: boolean;
   setOpemModalProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateProduct = ({
   opemModalProduct,
   setOpemModalProduct,
}: iModalProps) => {
   const { createProducts } = useContext(ProductsContext);
   const {clients} = useContext(ClientsContext)
   const {orders} = useContext(OrderContext)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iProductCreate>({ resolver: yupResolver(CreateProductSchema) });

   const modalClose = () => {
      setOpemModalProduct(!opemModalProduct);
   };

   const submit: SubmitHandler<iProductCreate> = (data) => {

      const checkId = data.product_order_id !== undefined ? data.product_order_id.toString() : "";

      const client = clients.find(
         (client: iClients) => client.name_client == checkId
      );
         console.log(client)

      const orderId = orders.find(
         (order: iOrders) => order.client_id == client?.id)

      const productOrder:number | undefined = orderId?.id

      const sku = new Date().getMilliseconds().toString();

      const newData = {
         ...data,
         product_order_id:productOrder,
         sku_product:`SKU${sku}`
      }

      createProducts(newData)

      modalClose()
   };

   return (
      <>
         <Dialog
            open={opemModalProduct}
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
         >
            <h3 className="Title Modal">Cadastrar Produto</h3>

            <FormCreateStyled onSubmit={handleSubmit(submit)}>
               <Inputs
                  type="text"
                  label="Nome:"
                  id="title_product"
                  error={errors.title_product}
                  register={register("title_product")}
               />
               <Inputs
                  type="text"
                  label="Estoque:"
                  id="stock_product"
                  register={register("stock_product")}
                  error={errors.stock_product}
               />
               <Inputs
                  type="text"
                  label="Preço:"
                  id="price_product"
                  register={register("price_product")}
                  error={errors.price_product}
               />

               <Autocompletes
                  register={register("product_order_id")}
                  data={clients}
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

export default ModalCreateProduct;
