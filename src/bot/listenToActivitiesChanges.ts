import { ChannelType, EmbedBuilder, GuildMember } from 'discord.js';
import { getSubscribedUserChannels } from '../supabase/server/getSubscribedUserChannels.js';
import { subscribeToActivitiesChanges } from '../supabase/activities/listenToActivityChange.js';
import { Activity } from '../types/index.js';
import { client } from './client.js';
import { getUserById } from '../supabase/user/getUserById.js';

export async function listenToActivitiesChanges() {
  const userChannels = await getSubscribedUserChannels();

  console.log('userChannels', userChannels);

  subscribeToActivitiesChanges(async activity => {
    console.log('new activity', activity);
    const channelIds = userChannels.get(activity.user_id);
    console.log('channelsIds', channelIds);

    if (!channelIds) return;

    const channels = await Promise.all(channelIds.map(id => client.channels.fetch(id)));

    console.log('channels', !!channels);
    channels.forEach(async channel => {
      console.log('channel', !!channel);
      if (channel?.type !== ChannelType.GuildText) return;

      const user = await getUserById(activity.user_id);
      console.log('user', !!user);
      if (!user?.discord_id) return;

      const guild = channel.guild;
      console.log('guild', !!guild);
      if (!guild) return;

      const member = await guild.members.fetch({ user: user.discord_id, cache: false });
      const embed = await createEmbed(activity, member);

      console.log('member', !!member);
      console.log('embed', !!embed);
      if (!embed) {
        return channel.send('fix later');
      }

      channel.send({
        embeds: [embed],
      });
    });
    activity;
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
