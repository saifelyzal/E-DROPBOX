import type { FileUploadResult } from '../types';

export interface UploadProgress {
  bytesUploaded: number;
  totalBytes: number;
  percentage: number;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  chunkSize?: number;
  maxRetries?: number;
}

export interface ChunkUploadResult {
  path: string;
  etag: string;
}

export interface UploadMetadata {
  contentType: string;
  size: number;
  lastModified: number;
  name: string;
}