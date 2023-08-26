import { User } from 'discord.js';
import { DiscordServer } from '../../types/index.js';
import { client } from '../client.js';

/**
 * @returns `Map<userId, channelId>`
 */
export async function getSubscribedUserChannels() {
  const { data: userServers, error } = await client
    .from('discord_server_users')
    .select('user: users (id), server: discord_servers ( guild_id, channel_id )');

  // users channels map
  const map = new Map<User['id'], NonNullable<DiscordServer['channel_id']>[]>();

  userServers?.forEach(({ user, server }) => {
    const channelId = server?.channel_id;
    const userId = user?.id;

    if (!userId || !channelId) return;

    const existingItem = map.get(userId);
    if (existingItem) {
      map.set(userId, [...existingItem, channelId]);
    } else {
      map.set(userId, [channelId]);
    }
  });

  return map;
}
