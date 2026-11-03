export const PRODUTO_SORT_FIELDS = [
  { value: 'id', label: 'ID' },
  { value: 'sku', label: 'SKU' },
  { value: 'titulo', label: 'Título' },
  { value: 'preco', label: 'Preço' },
  { value: 'estoque', label: 'Estoque' },
] as const;

export const PRODUTO_LABELS = {
  title: 'Produtos',
  subtitle: 'SKU, preço e estoque para montar pedidos.',
  create: 'Novo produto',
  edit: 'Editar produto',
  empty: 'Nenhum produto encontrado',
} as const;
