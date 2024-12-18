import { supabase } from './client';
import { storageConfig } from '../../services/storage/config';
import { AppError } from '../../utils/error';
import { STORAGE_ERRORS } from '../../services/storage/errors';

async function verifyAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new AppError(
      STORAGE_ERRORS.AUTH_REQUIRED,
      'STORAGE_AUTH_REQUIRED'
    );
  }
  return true;
}

async function checkBucketExists(bucketName: string): Promise<boolean> {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      if (error.message?.includes('Permission denied')) {
        throw new AppError(
          STORAGE_ERRORS.PERMISSION_DENIED,
          'STORAGE_PERMISSION_DENIED'
        );
      }
      return false;
    }

    return buckets?.some(bucket => bucket.name === bucketName) ?? false;
  } catch (error) {
    if (error instanceof AppError) throw error;
    return false;
  }
}

async function createBucket(bucketName: string) {
  try {
    const { error } = await supabase.storage.createBucket(
      bucketName,
      storageConfig.bucketConfig
    );

    if (error) {
      if (error.message?.includes('Permission denied')) {
        throw new AppError(
          STORAGE_ERRORS.PERMISSION_DENIED,
          'STORAGE_PERMISSION_DENIED'
        );
      }
      throw new AppError(
        STORAGE_ERRORS.INITIALIZATION_FAILED,
        'STORAGE_INIT_ERROR',
        error
      );
    }

    return true;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      STORAGE_ERRORS.INITIALIZATION_FAILED,
      'STORAGE_INIT_ERROR',
      error
    );
  }
}

async function verifyBucketAccess(bucketName: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1 });

    if (error) {
      if (error.message?.includes('Permission denied')) {
        throw new AppError(
          STORAGE_ERRORS.PERMISSION_DENIED,
          'STORAGE_PERMISSION_DENIED'
        );
      }
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof AppError) throw error;
    return false;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function initializeStorage(): Promise<boolean> {
  const bucketName = storageConfig.bucket;
  let retries = 0;
  const maxRetries = storageConfig.maxRetries;

  while (retries < maxRetries) {
    try {
      // First verify authentication
      await verifyAuth();

      // Check if bucket exists
      const exists = await checkBucketExists(bucketName);
      
      if (!exists) {
        // Create bucket if it doesn't exist
        await createBucket(bucketName);
        // Wait for bucket creation to propagate
        await wait(1000);
      }

      // Verify bucket access
      const hasAccess = await verifyBucketAccess(bucketName);
      
      if (!hasAccess) {
        throw new AppError(
          STORAGE_ERRORS.BUCKET_NOT_FOUND,
          'STORAGE_BUCKET_NOT_FOUND'
        );
      }

      return true;
    } catch (error) {
      retries++;
      
      // Don't retry auth or permission errors
      if (error instanceof AppError && 
         (error.code === 'STORAGE_AUTH_REQUIRED' || 
          error.code === 'STORAGE_PERMISSION_DENIED')) {
        throw error;
      }
      
      if (retries === maxRetries) {
        if (error instanceof AppError) throw error;
        throw new AppError(
          STORAGE_ERRORS.INITIALIZATION_FAILED,
          'STORAGE_INIT_ERROR',
          error
        );
      }

      // Exponential backoff
      await wait(storageConfig.retryDelay * Math.pow(2, retries - 1));
    }
  }

  return false;
}