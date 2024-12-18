import { z } from 'zod';
import { AppError } from './error';

export async function validateData<T extends z.ZodType>(
  schema: T,
  data: unknown
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        'Validation failed',
        'VALIDATION_ERROR',
        error.errors
      );
    }
    throw error;
  }
}