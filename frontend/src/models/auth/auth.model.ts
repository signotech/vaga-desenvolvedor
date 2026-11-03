export type AuthUser = {
  id: number;
  nome: string;
  email: string;
};

export type LoginInput = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};
