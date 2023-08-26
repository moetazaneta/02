import { createClient } from '@supabase/supabase-js';
import { env } from '../services/env.js';
import { Database } from '../types/database.types.js';

export const client = createClient<Database>(env.supabase.url, env.supabase.serviceKey, {
  auth: {
    persistSession: false,
  },
});
