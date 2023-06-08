import * as yup from "yup";

export const CreateProductSchema = yup.object().shape({
   title_product: yup.string().required("Nome obrigatorio"),

   price_product: yup
      .number()
      .positive()
      .required("Preço obrigatorio")
      .typeError("Digite um valor valido"),

   stock_product: yup
      .number()
      .required("Digite a quantidade em estoque")
      .typeError("Digite um valor valido"),
});
