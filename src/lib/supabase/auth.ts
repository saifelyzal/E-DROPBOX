import { supabase } from './client';
import { useAuthStore } from '../../store/auth';

export async function initializeAuth() {
  // Get initial session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Set initial user
  useAuthStore.getState().setUser(session?.user ?? null);
  
  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setUser(session?.user ?? null);
  });
}