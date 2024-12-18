import { StorageError } from '@supabase/storage-js';
import { AppError } from '../../utils/error';

export const STORAGE_ERRORS = {
  BUCKET_NOT_FOUND: 'Storage system not initialized. Please try again.',
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  INVALID_FILE: 'Invalid file selected.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INITIALIZATION_FAILED: 'Failed to initialize storage system. Please try again.',
  PERMISSION_DENIED: 'You do not have permission to access storage. Please sign in again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  AUTH_REQUIRED: 'Authentication required to access storage.',
} as const;

export function handleStorageError(error: StorageError): never {
  console.debug('Storage error:', error);

  if (error.message?.includes('Permission denied')) {
    throw new AppError(
      STORAGE_ERRORS.PERMISSION_DENIED,
      'STORAGE_PERMISSION_DENIED'
    );
  }

  switch (error.statusCode) {
    case 400:
      throw new AppError(
        STORAGE_ERRORS.INITIALIZATION_FAILED,
        'STORAGE_INIT_ERROR'
      );
    case 401:
      throw new AppError(
        STORAGE_ERRORS.AUTH_REQUIRED,
        'STORAGE_AUTH_REQUIRED'
      );
    case 403:
      throw new AppError(
        STORAGE_ERRORS.PERMISSION_DENIED,
        'STORAGE_PERMISSION_DENIED'
      );
    case 404:
      throw new AppError(
        STORAGE_ERRORS.BUCKET_NOT_FOUND,
        'STORAGE_BUCKET_NOT_FOUND'
      );
    case 429:
      throw new AppError(
        STORAGE_ERRORS.RATE_LIMIT,
        'STORAGE_RATE_LIMIT'
      );
    default:
      throw new AppError(
        STORAGE_ERRORS.INITIALIZATION_FAILED,
        'STORAGE_INIT_ERROR',
        error
      );
  }
}