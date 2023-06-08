import * as yup from "yup";

export const CreateOrderSchema = yup.object().shape({
      request_status: yup.
      string().required(),
});
