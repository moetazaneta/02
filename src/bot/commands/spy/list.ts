import { createSubcommand } from '../utils/createCommand.js';
import { addChannel } from '../../../supabase/server/addChannel.js';
import { removeChannel } from '../../../supabase/server/removeChannel.js';
import { getAllUsers } from '../../../supabase/user/getAllUsers.js';
import { getSubscribedUserIds } from '../../../supabase/server/getSubscribedUsers.js';
import { getAllUserProviders } from '../../../supabase/user/getAllUserProviders.js';
import { getChannel } from '../../../supabase/server/getChannel.js';
import { User, UserProvider } from '../../../types/index.js';
import { getUserById } from '../../../supabase/user/getUserById.js';
import { getUserByDiscordId } from '../../../supabase/user/getUserByDiscordId.js';
import { getUserProviders } from '../../../supabase/user/getUserProviders.js';
import { get } from 'http';

export const spyInfoSubcommand = createSubcommand({
  name: 'info',
  description: 'show info',
  // prettier-ignore
  customizeBuilder: b => b
    .addUserOption(o => o
      .setName('member')
      .setDescription('user')
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.guildId) {
      await interaction.reply({
        content: 'do it on the server.',
        ephemeral: true,
      });
      return;
    }

    const member = interaction.options.getUser('member');

    if (!member) {
      await interaction.reply({
        content: await getChannelInfo(interaction.guildId),
        ephemeral: true,
      });
      return;
    }

    // const [users, userProviders, subscribedUserIds, channel] = await Promise.all([
    //   getAllUsers(),
    //   getAllUserProviders(),
    //   getSubscribedUserIds({ discordGuildId: interaction.guildId }),
    //   getChannel({ guildId: interaction.guildId }),
    // ]);

    // let messageText = `**Channel:** ${channel?.channel_id ?? 'not set'}\n`;

    // subscribedUserIds.forEach(subscribedUserId => {
    //   const user = users.find(user => user.id === subscribedUserId);

    //   if (user == null) return;

    //   messageText += `\n<@${user.discord_id}> (${user.id})\n`;
    //   const userProvidersForUser = userProviders.filter(
    //     userProvider => userProvider.user_id === user.id
    //   );
    //   userProvidersForUser.forEach(userProvider => {
    //     const provider = userProvider.provider_type;
    //     messageText += `**${provider}:** ${userProvider.provider_user_name} (${userProvider.provider_user_id})\n`;
    //   });
    // });

    await interaction.reply({
      content: await getUserInfo(interaction.guildId, member.id),
      ephemeral: true,
    });
  },
});

async function getChannelInfo(guildId: string) {
  const [users, userProviders, subscribedUserIds, channel] = await Promise.all([
    getAllUsers(),
    getAllUserProviders(),
    getSubscribedUserIds({ discordGuildId: guildId }),
    getChannel({ guildId: guildId }),
  ]);

  let messageText = `**Channel:** ${channel?.channel_id ?? 'not set'}\n`;

  subscribedUserIds.forEach(subscribedUserId => {
    const user = users.find(user => user.id === subscribedUserId);

    if (user == null) return;

    const userProvidersForUser = userProviders.filter(
      userProvider => userProvider.user_id === user.id
    );
    messageText += '\n' + createUserInfoText(user, userProvidersForUser) + '\n';
  });

  if (subscribedUserIds.length === 0) {
    messageText += 'no spy on users';
  }

  return messageText;
}

async function getUserInfo(guildId: string, userDiscordId: string) {
  const user = await getUserByDiscordId(userDiscordId);
  if (!user) return 'user is not spy on';

  const userProviders = await getUserProviders(user.id);

  return createUserInfoText(user, userProviders);
}

function createUserInfoText(user: User, userProviders: UserProvider[]) {
  let messageText = `<@${user.discord_id}> (${user.id})\n`;
  messageText += userProviders
    .map(
      userProvider =>
        `**${userProvider.provider_type}:** ${userProvider.provider_user_name} (${userProvider.provider_user_id})`
    )
    .join('\n');
  console.log(messageText);
  return messageText;
}
