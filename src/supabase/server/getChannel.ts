import { client } from '../client.js';

export type GetChannelArgs = {
  guildId: string;
};
export async function getChannel({ guildId }: GetChannelArgs) {
  // prettier-ignore
  const { data, error } = await client
    .from('discord_server_channels')
    .select()
    .eq('guild_id', guildId);

  if (error) throw error;

  return data[0];
}
