import { Provider, User } from '../../types/index.js';
import { client } from '../client.js';

export type AddUserArgs = {
  discordUserId: string;
  name: string;
};

export async function addUser({ discordUserId, name }: AddUserArgs): Promise<User> {
  const { data, error } = await client
    .from('users')
    .insert([{ discord_id: discordUserId, name }])
    .select();

  if (error) throw error;

  return data[0];
}
