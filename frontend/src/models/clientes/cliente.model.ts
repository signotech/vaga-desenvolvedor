export type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type ClienteInput = {
  nome: string;
  cpf: string;
  email: string;
};
