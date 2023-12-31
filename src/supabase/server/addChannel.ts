import { client } from '../client.js';

export type AddChannelArgs = {
  channelId: string;
  guildId: string;
};
export async function addChannel({ guildId, channelId }: AddChannelArgs) {
  const { error } = await client
    .from('discord_servers')
    .insert([{ guild_id: guildId, channel_id: channelId }])
    .select();

  if (error) throw error;
}
