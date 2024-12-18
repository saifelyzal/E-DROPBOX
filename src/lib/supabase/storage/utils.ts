export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  baseDelay: number,
  onRetry?: (attempt: number, error: unknown) => void
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (onRetry) {
        onRetry(attempt, error);
      }

      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 500;
      const delay = baseDelay * Math.pow(2, attempt - 1) + jitter;
      await wait(delay);
    }
  }

  throw lastError;
}