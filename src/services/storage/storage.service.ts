import { supabase } from '../../lib/supabase';
import { BaseService } from '../base.service';
import { handleStorageError, STORAGE_ERRORS } from './errors';
import { validateFile } from './validation';
import { storageConfig } from './config';
import type { FileUploadResult } from './types';
import { AppError } from '../../utils/error';

export class StorageService extends BaseService {
  async uploadFile(file: File): Promise<FileUploadResult> {
    return this.handleServiceError(async () => {
      // Validate file
      validateFile(file);

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from(storageConfig.bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        handleStorageError(uploadError);
      }

      if (!data?.path) {
        throw new AppError(
          STORAGE_ERRORS.UPLOAD_FAILED,
          'STORAGE_UPLOAD_ERROR'
        );
      }

      return {
        path: data.path,
        name: file.name,
        size: file.size,
        type: file.type
      };
    });
  }
}