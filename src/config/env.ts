import { envSchema } from './env.validation';
import type { EnvironmentConfig } from './env.types';

function validateEnv(): EnvironmentConfig['supabase'] {
  const env = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errorMessages = result.error.errors.map(error => 
      `${error.path.join('.')}: ${error.message}`
    ).join('\n');

    throw new Error(
      `Environment validation failed:\n${errorMessages}\n` +
      'Please check your .env.local file and ensure all required variables are set correctly.\n\n' +
      'Required format:\n' +
      'VITE_SUPABASE_URL=https://your-project-id.supabase.co\n' +
      'VITE_SUPABASE_ANON_KEY=your-supabase-anon-key'
    );
  }

  return {
    url: result.data.VITE_SUPABASE_URL,
    anonKey: result.data.VITE_SUPABASE_ANON_KEY,
  };
}

export const config: EnvironmentConfig = {
  supabase: validateEnv(),
};