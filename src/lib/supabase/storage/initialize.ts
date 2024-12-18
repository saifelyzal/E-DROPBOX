import { storageConfig } from '../../../services/storage/config';
import { AppError } from '../../../utils/error';
import { verifyAuth } from './auth';
import { checkBucketExists, createBucket, verifyBucketAccess } from './bucket';
import { retryWithBackoff, wait } from './utils';

async function initializeStorageSystem(): Promise<boolean> {
  const bucketName = storageConfig.bucket;

  // First verify authentication
  await verifyAuth();

  // Check if bucket exists
  const exists = await checkBucketExists(bucketName);
  
  if (!exists) {
    // Create bucket if it doesn't exist
    await createBucket(bucketName);
    // Wait for bucket creation to propagate
    await wait(1500);
  }

  // Verify bucket access
  const hasAccess = await verifyBucketAccess(bucketName);
  
  if (!hasAccess) {
    throw new AppError(
      'Storage system not initialized',
      'STORAGE_BUCKET_NOT_FOUND'
    );
  }

  return true;
}

export async function initializeStorage(
  onError?: (error: Error) => void
): Promise<boolean> {
  try {
    return await retryWithBackoff(
      initializeStorageSystem,
      storageConfig.maxRetries,
      storageConfig.retryDelay,
      (attempt, error) => {
        console.error(`Storage initialization attempt ${attempt} failed:`, error);
      }
    );
  } catch (error) {
    if (onError) {
      onError(error instanceof Error ? error : new Error('Storage initialization failed'));
    }
    return false;
  }
}