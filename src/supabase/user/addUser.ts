import { User } from '../../types/index.js';
import { client } from '../client.js';

export type AddUserArgs = {
  discordUserId: string;
  anilistId: number;
};

export async function addUser({ discordUserId, anilistId }: AddUserArgs): Promise<User> {
  const { data, error } = await client
    .from('users')
    .insert([{ discord_id: discordUserId, anilist_id: anilistId }])
    .select();

  if (error) throw error;

  return data[0];
}
