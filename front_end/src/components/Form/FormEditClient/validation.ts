import * as yup from "yup";

export const EditClientSchema = yup.object().shape({
   name_client: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      }),
      cpf_client: yup
      .string()
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      })
      .nullable(),

      email_client: yup
      .string()
      .email()
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      })
      .nullable(),
});
