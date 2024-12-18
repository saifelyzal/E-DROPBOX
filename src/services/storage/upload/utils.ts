import { storageConfig } from '../config';

export function generateUploadPath(file: File): string {
  const timestamp = new Date().toISOString().split('T')[0];
  const uniqueId = crypto.randomUUID();
  const extension = file.name.split('.').pop();
  
  return `${timestamp}/${uniqueId}.${extension}`;
}

export function calculateChunkSize(fileSize: number): number {
  const defaultChunkSize = 1024 * 1024; // 1MB
  const maxChunks = 10000; // Supabase limit
  
  const optimalChunkSize = Math.ceil(fileSize / maxChunks);
  return Math.max(optimalChunkSize, defaultChunkSize);
}

export function createProgressTracker(
  totalSize: number,
  onProgress?: (progress: { bytesUploaded: number; totalBytes: number; percentage: number }) => void
) {
  let bytesUploaded = 0;

  return {
    updateProgress: (chunkSize: number) => {
      bytesUploaded += chunkSize;
      const percentage = Math.min((bytesUploaded / totalSize) * 100, 100);
      
      onProgress?.({
        bytesUploaded,
        totalBytes: totalSize,
        percentage
      });
    },
    getProgress: () => ({
      bytesUploaded,
      totalBytes: totalSize,
      percentage: (bytesUploaded / totalSize) * 100
    })
  };
}