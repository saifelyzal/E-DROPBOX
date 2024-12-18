import { supabase } from '../../../lib/supabase';
import { storageConfig } from '../config';
import { AppError } from '../../../utils/error';
import { STORAGE_ERRORS } from '../errors';
import { validateUploadMetadata } from './validation';
import { generateUploadPath, calculateChunkSize, createProgressTracker } from './utils';
import { retryOperation } from '../../../lib/supabase/storage/utils';
import type { UploadOptions, FileUploadResult } from './types';

export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<FileUploadResult> {
  // Validate file metadata
  validateUploadMetadata(file);
  
  // Generate unique path for the file
  const path = generateUploadPath(file);
  
  try {
    const { error: uploadError } = await supabase.storage
      .from(storageConfig.bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new AppError(
        STORAGE_ERRORS.UPLOAD_FAILED,
        'STORAGE_UPLOAD_ERROR',
        uploadError
      );
    }

    // Get the public URL if needed
    const { data: { publicUrl } } = supabase.storage
      .from(storageConfig.bucket)
      .getPublicUrl(path);

    return {
      path,
      name: file.name,
      size: file.size,
      type: file.type,
      url: publicUrl
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      STORAGE_ERRORS.UPLOAD_FAILED,
      'STORAGE_UPLOAD_ERROR',
      error
    );
  }
}