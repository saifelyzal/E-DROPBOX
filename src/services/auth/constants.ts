export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already registered',
  SERVICE_ERROR: 'Service temporarily unavailable. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SESSION_EXPIRED: 'Session expired. Please sign in again.',
  GENERIC_ERROR: 'Authentication failed. Please try again.',
  SIGNUP_ERROR: 'Unable to complete signup. Please try again.',
  SIGNIN_ERROR: 'Unable to sign in. Please try again.',
} as const;