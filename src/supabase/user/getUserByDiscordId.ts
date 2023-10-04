import { User } from '../../types/index.js';
import { client } from '../client.js';

export async function getUserByDiscordId(discordUserId: string): Promise<User | null> {
  // prettier-ignore
  const { data, error } = await client
    .from('users')
    .select('*')
    .or(`discord_id.eq.${discordUserId}`);

  return data?.[0] ?? null;
}
