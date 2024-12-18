import { AppError, handleError } from '../utils/error';

export abstract class BaseService {
  protected async handleServiceError<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      const appError = handleError(error);
      throw new AppError(
        `Operation failed: ${appError.message}`,
        appError.code,
        appError.details
      );
    }
  }
}