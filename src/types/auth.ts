import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'employee';

export interface AuthState {
  user: User | null;
  role: UserRole;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
}