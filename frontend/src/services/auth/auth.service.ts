import { api } from '@/config/api.config';
import type { AuthUser, LoginInput, LoginResponse } from '@/models/auth/auth.model';

export const AuthService = {
  async login(payload: LoginInput): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>('/auth/me');
    return data;
  },
};
