import { Database as DB } from './database.types.js';

export type Database = DB;

export type Tables<T extends keyof DB['public']['Tables']> = DB['public']['Tables'][T]['Row'];

export type Activity = Tables<'activities'>;
export type User = Tables<'users'>;
export type DiscordServer = Tables<'discord_servers'>;
export type DiscordServerUsers = Tables<'discord_server_users'>;
