import { supabase } from '../../lib/supabase';
import { BaseService } from '../base.service';
import { handleAuthError } from './errors';
import { AppError } from '../../utils/error';
import { AUTH_ERRORS } from './constants';
import { signInSchema, signUpSchema } from './validation';
import type { SignInOptions, SignUpOptions } from './types';

export class AuthService extends BaseService {
  async signIn(options: SignInOptions) {
    return this.handleServiceError(async () => {
      const validated = await signInSchema.parseAsync(options);
      const { data, error } = await supabase.auth.signInWithPassword(validated);
      
      if (error) {
        handleAuthError(error, 'signin');
      }
      
      if (!data.user) {
        throw new AppError(AUTH_ERRORS.SIGNIN_ERROR, 'AUTH_FAILED');
      }
      
      return data;
    });
  }

  async signUp(options: SignUpOptions) {
    return this.handleServiceError(async () => {
      const validated = await signUpSchema.parseAsync(options);
      const { data, error } = await supabase.auth.signUp({
        ...validated,
        options: {
          emailRedirectTo: validated.redirectTo || `${window.location.origin}/auth/callback`,
          data: { email_confirmed: false }
        }
      });
      
      if (error) {
        handleAuthError(error, 'signup');
      }
      
      return data;
    });
  }

  async signOut() {
    return this.handleServiceError(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        handleAuthError(error, 'signout');
      }
    });
  }

  async refreshSession() {
    return this.handleServiceError(async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        handleAuthError(error, 'session');
      }
      
      if (!session) {
        throw new AppError(AUTH_ERRORS.SESSION_EXPIRED, 'AUTH_SESSION_EXPIRED');
      }
      
      return session;
    });
  }
}