export const PEDIDO_SORT_FIELDS = [
  { value: 'id', label: 'ID' },
  { value: 'cliente_id', label: 'Cliente' },
  { value: 'data_pedido', label: 'Data' },
  { value: 'status', label: 'Status' },
  { value: 'desconto', label: 'Desconto' },
] as const;

export const PEDIDO_LABELS = {
  title: 'Pedidos',
  subtitle: 'Itens, desconto e status em uma lista só.',
  create: 'Novo pedido',
  edit: 'Editar pedido',
  empty: 'Nenhum pedido encontrado',
} as const;
