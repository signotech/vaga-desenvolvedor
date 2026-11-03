import type { Cliente } from '@/models/clientes/cliente.model';

export const clienteMock: Cliente = {
  id: 1,
  nome: 'Ana Silva',
  cpf: '11111111111',
  email: 'ana@email.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
