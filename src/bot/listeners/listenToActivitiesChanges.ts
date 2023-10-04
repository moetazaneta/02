import { ChannelType, EmbedBuilder, GuildMember } from 'discord.js';
import { getSubscribedUserChannels } from '../../supabase/server/getSubscribedUserChannels.js';
import { subscribeToActivitiesChanges } from '../../supabase/activities/listenToActivityChange.js';
import { Activity } from '../../types/index.js';
import { client } from '../discord/client.js';
import { getUserById } from '../../supabase/user/getUserById.js';

export async function listenToActivitiesChanges() {
  const userChannels = await getSubscribedUserChannels();

  subscribeToActivitiesChanges(async activity => {
    const channelIds = userChannels.get(activity.user_id);
    if (!channelIds) return;

    const channels = await Promise.all(channelIds.map(id => client.channels.fetch(id)));
    channels.forEach(async channel => {
      if (channel?.type !== ChannelType.GuildText) return;

      const user = await getUserById(activity.user_id);
      if (!user?.discord_id) return;

      const member = await channel.guild.members.fetch({ user: user.discord_id, cache: false });
      const embed = await createEmbed(activity, member);

      channel.send({
        embeds: [embed],
      });
    });
  });
}

async function createEmbed(activity: Activity, member: GuildMember) {
  return new EmbedBuilder()
    .setColor(member.displayHexColor)
    .setTitle(activity.title)
    .setURL(activity.url)
    .setAuthor({
      name: member.displayName,
      iconURL: member.displayAvatarURL(),
    })
    .setDescription(activity.status)
    .setThumbnail(activity.image_url);
}
