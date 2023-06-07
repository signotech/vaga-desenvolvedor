import * as yup from "yup";

export const EditOrderSchema = yup.object().shape({
   request_status: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
         if (originalValue === "") {
            return null;
         }
         return value;
      }),
});
