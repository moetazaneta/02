import { client } from '../client.js';

export type getGuildUserIdsArgs = {
  discordGuildId: string;
};

export async function getSubscribedUsers({ discordGuildId }: getGuildUserIdsArgs) {
  const { data, error } = await client
    .from('discord_server_users')
    .select('*')
    .or(`guild_id.eq.${discordGuildId}`);

  return (data ?? []).map(user => user.user_id);
}
