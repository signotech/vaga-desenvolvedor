import { z } from 'zod';

export const produtoSchema = z.object({
  sku: z.string().trim().min(1, 'SKU é obrigatório').max(100, 'SKU deve ter no máximo 100 caracteres'),
  titulo: z
    .string()
    .trim()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  preco: z.coerce.number().min(0, 'Preço deve ser positivo'),
  estoque: z.coerce.number().int('Estoque deve ser inteiro').min(0, 'Estoque inválido'),
});

export type ProdutoFormInput = z.input<typeof produtoSchema>;
export type ProdutoFormValues = z.output<typeof produtoSchema>;
