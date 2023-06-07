import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Inputs from "../Inputs";
import { useContext } from "react";
import { FormProductStyled } from "./styled";
import { iProductsUpdate } from "../../../contexts/products/@types";
import { ProductsContext } from "../../../contexts/products";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { EditProductSchema } from "./validation";

interface iFormProps {
   id: number;
   modalClose: () => void
}
const FormEditProduct = ({ id, modalClose}: iFormProps) => {
   const { editProducts } = useContext(ProductsContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iProductsUpdate>({ resolver: yupResolver(EditProductSchema)});

   const submit: SubmitHandler<iProductsUpdate> = (data) => {
      
      editProducts(data,id);
      
      modalClose()
   };

   return (
      <FormProductStyled onSubmit={handleSubmit(submit)}>
         <h2 className="Title Modal"> Editar Produto</h2>
         <Inputs
            type="text"
            label="Nome do produto:(opcional)"
            id="title_product"
            error={errors.title_product}
            register={register("title_product")}
         />
         <Inputs
            type="text"
            label="Preço do Produto:(opcional)"
            id="price_product"
            register={register("price_product")}
            error={errors.price_product}
         />
         <Inputs
            type="text"
            label="Estoque total:(opcional)"
            id="stock_product"
            register={register("stock_product")}
            error={errors.stock_product}
         />

         <DialogActions>
            <Button onClick={modalClose} size="medium" variant="contained">
               Voltar
            </Button>
            <Button color="success" size="medium" variant="contained" type="submit">
               Editar
            </Button>
         </DialogActions>
      </FormProductStyled>
   );
};

export default FormEditProduct;
