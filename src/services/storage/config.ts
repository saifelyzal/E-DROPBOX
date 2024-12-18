import type { StorageConfig } from './types';

export const storageConfig: StorageConfig = {
  bucket: 'employee-credentials',
  allowedFileTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  bucketConfig: {
    public: false,
    allowedMimeTypes: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    fileSizeLimit: 5 * 1024 * 1024, // 5MB in bytes
  }
};