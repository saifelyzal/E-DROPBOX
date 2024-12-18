export interface StorageConfig {
  bucket: string;
  allowedFileTypes: string[];
  maxFileSize: number;
  maxRetries: number;
  retryDelay: number;
  bucketConfig: {
    public: boolean;
    allowedMimeTypes: string[];
    fileSizeLimit: number;
  };
}

export interface FileUploadResult {
  path: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}