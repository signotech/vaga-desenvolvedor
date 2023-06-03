import * as yup from 'yup';

export const loginSchema = yup.object().shape({
   email_user: yup.string().required('E-mail obrigatório'),
   password_user: yup.string().required('Senha obrigatória'),
});
