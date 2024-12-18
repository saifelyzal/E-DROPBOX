import { AuthError } from '@supabase/supabase-js';
import { AppError } from '../../utils/error';
import { AUTH_ERRORS } from './constants';

export function handleAuthError(error: AuthError, operation: 'signin' | 'signup' | 'signout' | 'session'): never {
  console.debug(`Auth error during ${operation}:`, error);

  // Handle specific error cases first
  if (error.message?.includes('Email rate limit exceeded')) {
    throw new AppError(
      'Too many attempts. Please try again later.',
      'AUTH_RATE_LIMIT'
    );
  }

  switch (error.status) {
    case 400:
      throw new AppError(
        AUTH_ERRORS.INVALID_CREDENTIALS,
        'AUTH_INVALID_CREDENTIALS'
      );
    case 422:
      throw new AppError(
        AUTH_ERRORS.EMAIL_EXISTS,
        'AUTH_EMAIL_EXISTS'
      );
    case 500:
      throw new AppError(
        AUTH_ERRORS.SERVICE_ERROR,
        'AUTH_SERVICE_ERROR'
      );
    case 0:
      throw new AppError(
        AUTH_ERRORS.NETWORK_ERROR,
        'NETWORK_ERROR'
      );
    default:
      throw new AppError(
        operation === 'signup' 
          ? AUTH_ERRORS.SIGNUP_ERROR 
          : AUTH_ERRORS.GENERIC_ERROR,
        'AUTH_ERROR',
        error
      );
  }
}