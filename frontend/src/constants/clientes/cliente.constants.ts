export const CLIENTE_SORT_FIELDS = [
  { value: 'id', label: 'ID' },
  { value: 'nome', label: 'Nome' },
  { value: 'cpf', label: 'CPF' },
  { value: 'email', label: 'E-mail' },
] as const;

export const CLIENTE_LABELS = {
  title: 'Clientes',
  subtitle: 'Busque, cadastre e atualize clientes do pedido.',
  create: 'Novo cliente',
  edit: 'Editar cliente',
  empty: 'Nenhum cliente encontrado',
} as const;
