export interface BucketOptions {
  fileSizeLimit?: number;
  allowedMimeTypes?: string[];
}

export interface StorageInitOptions {
  retryAttempts?: number;
  retryDelay?: number;
}