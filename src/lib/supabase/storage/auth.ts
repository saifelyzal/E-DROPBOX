import { supabase } from '../client';
import { AppError } from '../../../utils/error';
import { STORAGE_ERRORS } from '../../../services/storage/errors';

export async function verifyAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new AppError(
      STORAGE_ERRORS.AUTH_REQUIRED,
      'STORAGE_AUTH_REQUIRED'
    );
  }
  return true;
}