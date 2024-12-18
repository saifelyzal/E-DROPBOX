import { z } from 'zod';
import { storageConfig } from './config';
import { AppError } from '../../utils/error';

export const fileSchema = z.custom<File>(
  (file) => file instanceof File,
  'Please select a valid file'
)
.refine(
  (file) => file.size <= storageConfig.maxFileSize,
  `File size must be less than ${storageConfig.maxFileSize / 1024 / 1024}MB`
)
.refine(
  (file) => storageConfig.allowedFileTypes.includes(file.type),
  `File type must be one of: ${storageConfig.allowedFileTypes.join(', ')}`
);

export function validateFile(file: File): void {
  try {
    fileSchema.parse(file);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        error.errors[0].message,
        'INVALID_FILE'
      );
    }
    throw error;
  }
}