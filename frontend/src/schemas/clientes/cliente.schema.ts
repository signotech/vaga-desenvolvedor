import { z } from 'zod';
import { onlyDigits } from '@/utils/cpf.util';

export const clienteSchema = z.object({
  nome: z.string().trim().min(1, 'Nome é obrigatório').max(150, 'Nome deve ter no máximo 150 caracteres'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine((value) => onlyDigits(value).length === 11, 'CPF deve ter 11 dígitos'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail deve ter no máximo 255 caracteres'),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;

export function toClientePayload(values: ClienteFormValues) {
  return {
    nome: values.nome,
    cpf: onlyDigits(values.cpf),
    email: values.email,
  };
}
