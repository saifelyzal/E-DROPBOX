import { create } from 'zustand';
import type { AuthState } from '../types/auth';
import { authService } from '../services/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password) => {
    const { user } = await authService.signIn({ email, password });
    set({ user });
  },
  signUp: async (email, password) => {
    await authService.signUp({ email, password });
  },
  signOut: async () => {
    await authService.signOut();
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
}));