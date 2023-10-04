import { Database as DB } from './database.types.js';

export type Database = DB;

export type Tables<T extends keyof DB['public']['Tables']> = DB['public']['Tables'][T]['Row'];

export type Activity = Tables<'activities'>;
export type User = Tables<'users'>;
export type UserProvider = Tables<'user_providers'>;
export type DiscordServerChannel = Tables<'discord_server_channels'>;
export type DiscordServerUsers = Tables<'discord_server_users'>;

export type Provider = 'shiki' | 'anilist';
