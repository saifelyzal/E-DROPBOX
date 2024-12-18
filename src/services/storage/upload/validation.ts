import { z } from 'zod';
import { storageConfig } from '../config';
import { STORAGE_ERRORS } from '../errors';
import { AppError } from '../../../utils/error';

export const uploadMetadataSchema = z.object({
  contentType: z.string()
    .refine(type => storageConfig.allowedFileTypes.includes(type), {
      message: `File type must be one of: ${storageConfig.allowedFileTypes.join(', ')}`
    }),
  size: z.number()
    .max(storageConfig.maxFileSize, `File size must be less than ${storageConfig.maxFileSize / 1024 / 1024}MB`),
  lastModified: z.number(),
  name: z.string().max(255, 'File name is too long')
});

export function validateUploadMetadata(file: File) {
  try {
    return uploadMetadataSchema.parse({
      contentType: file.type,
      size: file.size,
      lastModified: file.lastModified,
      name: file.name
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        error.errors[0].message,
        'INVALID_FILE'
      );
    }
    throw new AppError(
      STORAGE_ERRORS.INVALID_FILE,
      'INVALID_FILE',
      error
    );
  }
}