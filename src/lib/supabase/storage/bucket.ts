import { supabase } from '../client';
import { storageConfig } from '../../../services/storage/config';
import { AppError } from '../../../utils/error';
import { STORAGE_ERRORS } from '../../../services/storage/errors';

export async function checkBucketExists(bucketName: string): Promise<boolean> {
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

export async function createBucket(bucketName: string) {
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

export async function verifyBucketAccess(bucketName: string): Promise<boolean> {
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