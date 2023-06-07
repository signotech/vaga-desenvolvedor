import * as yup from "yup";

export const EditProductSchema = yup.object().shape({
   title_product: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      }),
   price_product: yup
      .number()
      .positive("Somente numeros positivos")
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      })
      .typeError("Por favor, informe um numero")
      .nullable(),

   stock_product: yup
      .number()
      .positive("Somente numeros positivos")
      .integer("Somente numeros inteiros")
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      })
      .typeError("Por favor, informe um numero")
      .nullable(),
});
