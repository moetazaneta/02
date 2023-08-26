import { client } from '../client.js';

export type AddUserArgs = {
  discordUserId: string;
};
export async function removeUser({ discordUserId }: AddUserArgs) {
  // prettier-ignore
  const { error: usersError } = await client
    .from('users')
    .delete()
    .eq('discord_id', discordUserId);

  return { error: usersError };

  // row is automatically deleted from 'discord_server_users' table
}
