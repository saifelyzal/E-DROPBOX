import { z } from 'zod';

const SUPABASE_URL_REGEX = /^https:\/\/[a-zA-Z0-9-]+\.supabase\.co$/;

export const envSchema = z.object({
  VITE_SUPABASE_URL: z.string()
    .regex(SUPABASE_URL_REGEX, 'Invalid Supabase URL format. Expected format: https://your-project.supabase.co')
    .url('Invalid Supabase URL'),
  VITE_SUPABASE_ANON_KEY: z.string()
    .min(1, 'Supabase anonymous key is required')
    .regex(/^ey/, 'Invalid Supabase anonymous key format. Should start with "ey"'),
});

export type EnvSchema = z.infer<typeof envSchema>;