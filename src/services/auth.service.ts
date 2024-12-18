import { supabase } from '../lib/supabase';
import { BaseService } from './base.service';
import { AuthError } from '@supabase/supabase-js';
import { AppError } from '../utils/error';

class AuthService extends BaseService {
  private handleAuthError(error: AuthError) {
    console.debug('Auth error details:', error);

    switch (error.status) {
      case 400:
        throw new AppError(
          'Invalid email or password',
          'AUTH_INVALID_CREDENTIALS'
        );
      case 422:
        throw new AppError(
          'Email already registered',
          'AUTH_EMAIL_EXISTS'
        );
      case 500:
        throw new AppError(
          'Service temporarily unavailable. Please try again later.',
          'AUTH_SERVICE_ERROR'
        );
      case 0:
        throw new AppError(
          'Network error. Please check your connection',
          'NETWORK_ERROR'
        );
      default:
        throw new AppError(
          'Authentication failed. Please try again.',
          'AUTH_ERROR',
          error
        );
    }
  }

  async signIn(email: string, password: string) {
    return this.handleServiceError(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        this.handleAuthError(error);
      }
      
      if (!data.user) {
        throw new AppError(
          'Unable to sign in. Please try again.',
          'AUTH_FAILED'
        );
      }
      
      return data;
    });
  }

  async signUp(email: string, password: string) {
    return this.handleServiceError(async () => {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirmed: false
          }
        }
      });
      
      if (error) {
        this.handleAuthError(error);
      }
      
      return data;
    });
  }

  async signOut() {
    return this.handleServiceError(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        this.handleAuthError(error);
      }
    });
  }

  async refreshSession() {
    return this.handleServiceError(async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        this.handleAuthError(error);
      }
      
      if (!session) {
        throw new AppError(
          'Session expired. Please sign in again.',
          'AUTH_SESSION_EXPIRED'
        );
      }
      
      return session;
    });
  }
}