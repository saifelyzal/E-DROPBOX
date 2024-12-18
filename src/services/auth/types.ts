import type { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface SignUpOptions {
  email: string;
  password: string;
  redirectTo?: string;
}

export interface SignInOptions {
  email: string;
  password: string;
}