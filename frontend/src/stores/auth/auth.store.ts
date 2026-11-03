import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@/models/auth/auth.model';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: 'signo-auth' },
  ),
);

export function getAuthToken(): string | null {
  return useAuthStore.getState().token;
}
