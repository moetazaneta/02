import { client } from '../client.js';

export type CheckUserExistArgs = {
  discordGuildId: string;
  userId: string;
};

export async function checkSubscribedUserExist({ discordGuildId, userId }: CheckUserExistArgs) {
  const { data, error } = await client
    .from('discord_server_users')
    .select('*')
    .eq('guild_id', discordGuildId)
    .eq('user_id', userId)
    .select();

  return data != null && data.length > 0;
}
