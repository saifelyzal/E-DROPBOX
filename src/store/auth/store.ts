import { create } from 'zustand';
import type { AuthState, UserRole } from '../../types/auth';
import { authService } from '../../services/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: 'employee', // Default role
  loading: true,
  signIn: async (email, password) => {
    const { user } = await authService.signIn({ email, password });
    // In a real app, you would fetch the role from your backend
    const role: UserRole = email.includes('admin') ? 'admin' : 'employee';
    set({ user, role });
  },
  signUp: async (email, password) => {
    await authService.signUp({ email, password });
  },
  signOut: async () => {
    await authService.signOut();
    set({ user: null, role: 'employee' });
  },
  setUser: (user) => set({ user, loading: false }),
  setRole: (role) => set({ role }),
}));