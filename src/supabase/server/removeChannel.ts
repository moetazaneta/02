import { client } from '../client.js';

export type AddChannelArgs = {
  guildId: string;
};
export async function removeChannel({ guildId }: AddChannelArgs) {
  // prettier-ignore
  const { error } = await client
    .from('discord_servers')
    .delete()
    .eq('guild_id', guildId);

  if (error) throw error;
}
