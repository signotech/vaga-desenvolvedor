import * as yup from "yup";

export const CreateSchema = yup.object().shape({
   name_client: yup.string().required("Nome obrigatorio"),

   cpf_client: yup.string().required("CPF obrigatorio"),

   email_client: yup
      .string()
      .matches(/[a-z0-9.]+/, "Esse não e um E-mail valido ")
      .matches(/@/, "Esse não e um E-mail valido ")
      .matches(/[a-z0-9]+/, "Esse não e um E-mail valido ")
      .matches(/\./, "Esse não e um E-mail valido ")
      .matches(/[a-z]+/, "Esse não e um E-mail valido ")
      .required(),
});
