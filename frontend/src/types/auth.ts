export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER'; 
}

export interface AuthResponse {
  token: string;
  user: User;
}
