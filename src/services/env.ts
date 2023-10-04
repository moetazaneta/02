import 'dotenv/config';
import * as process from 'process';

export const env = {
  anilist: {
    client: process.env['ANILIST_API_CLIENT']!,
    secret: process.env['ANILIST_API_SECRET']!,
    name: process.env['ANILIST_API_NAME']!,
    redirect: process.env['ANILIST_API_REDIRECT']!,
    token: process.env['ANILIST_API_TOKEN']!,
  },
  discord: {
    appId: process.env['DISCORD_APP_ID']!,
    publicKey: process.env['DISCORD_PUBLIC_KEY']!,
    token: process.env['DISCORD_TOKEN']!,
  },
  supabase: {
    url: process.env['SUPABASE_URL']!,
    serviceKey: process.env['SUPABASE_SERVICE_ROLE_KEY']!,
  },
  env: process.env['NODE_ENV']!,
};
