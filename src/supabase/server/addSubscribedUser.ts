import { client } from '../client.js';

export type AddUserArgs = {
  discordGuildId: string;
  userId: string;
};

export async function addSubscribedUser({ discordGuildId, userId }: AddUserArgs) {
  return await client
    .from('discord_server_users')
    .insert([{ guild_id: discordGuildId, user_id: userId }])
    .select();
}
