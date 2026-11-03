export type Produto = {
  id: number;
  sku: string;
  titulo: string;
  preco: number | string;
  estoque: number;
  createdAt: string;
  updatedAt: string;
};

export type ProdutoInput = {
  sku: string;
  titulo: string;
  preco: number;
  estoque: number;
};
