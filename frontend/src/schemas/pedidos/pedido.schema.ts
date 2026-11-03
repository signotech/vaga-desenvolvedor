import { z } from 'zod';
import { PEDIDO_STATUS } from '@/models/pedidos/pedido.model';

export const pedidoItemSchema = z.object({
  produto_id: z.coerce.number().int().min(1, 'Selecione um produto'),
  quantidade: z.coerce.number().int().min(1, 'Quantidade mínima é 1'),
});

export const pedidoSchema = z.object({
  cliente_id: z.coerce.number().int().min(1, 'Selecione um cliente'),
  data_pedido: z.string().optional(),
  status: z.enum(PEDIDO_STATUS),
  desconto: z.coerce.number().min(0, 'Desconto inválido'),
  itens: z.array(pedidoItemSchema).min(1, 'Adicione ao menos um item'),
});

export type PedidoFormInput = z.input<typeof pedidoSchema>;
export type PedidoFormValues = z.output<typeof pedidoSchema>;
export type PedidoItemFormValues = z.output<typeof pedidoItemSchema>;
