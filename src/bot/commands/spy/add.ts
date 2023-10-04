import { addUser } from '../../../supabase/user/addUser.js';
import { getAnilistUserIdByName } from '../../../supabase/functions/getAnilistUserIdByName.js';
import { createSubcommand } from '../utils/createCommand.js';
import { checkUserExist } from '../../../supabase/user/checkUserExist.js';
import { subscribeUser } from '../../../supabase/server/addSubscribedUser.js';
import { getUserByDiscordId } from '../../../supabase/user/getUserByDiscordId.js';
import { checkUserSubscribed } from '../../../supabase/server/checkSubscribedUserExist.js';
import { Provider } from '../../../types/index.js';
import { invariant } from '../utils/invariant.js';
import { checkUserProviderExist } from '../../../supabase/user/checkUserProviderExist.js';
import { addUserProvider } from '../../../supabase/user/addUserProvider.js';
import { getProviderUserIdByName } from '../../../supabase/functions/getProviderUserIdByName.js';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { updateUserProvider } from '../../../supabase/user/updateUserProvider.js';

export const spyAddSubcommand = createSubcommand({
  name: 'add',
  description: 'add user to the spying list',
  // prettier-ignore
  customizeBuilder: b => b
    .addUserOption(o => o
      .setName('member')
      .setDescription('discord user to spy on')
      .setRequired(true)
    )
    .addStringOption(o => o
      .setName('anilist-name')
      .setDescription('anilist user name')
    )
    .addStringOption(o => o
      .setName('shikimori-name')
      .setDescription('shikimori user name')
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({ ephemeral: true });

    if (!interaction.guildId) {
      await appendLine(interaction, 'do it on the server');
      return;
    }

    const member = interaction.options.getUser('member');
    if (member == null) {
      interaction.followUp({
        content: 'input user',
        ephemeral: true,
      });
      return;
    }

    const providerMap = new Map<Provider, string | null>([
      ['anilist', interaction.options.getString('anilist-name')],
      ['shiki', interaction.options.getString('shikimori-name')],
    ]);
    if ([...providerMap.values()].every(value => value == null)) {
      interaction.followUp({
        content: 'input at least one of the names',
        ephemeral: true,
      });
      return;
    }

    await appendLine(interaction, '👀 checking whether user is already exists');

    const isUserExist = await checkUserExist(member.id);
    if (isUserExist) {
      await appendLine(interaction, '👌 user exists');
    } else {
      await appendLine(interaction, "😵 user doesn't exist");
      await appendLine(interaction, '👷 creating user');
    }

    const user = isUserExist
      ? await getUserByDiscordId(member.id)
      : await addUser({ discordUserId: member.id, name: member.username });
    if (!user) {
      await appendLine(interaction, "unlucky for you, ask to fix it, i thought it's impossible");
      return;
    }
    await appendLine(interaction, `🤡 user id "${user.id}"`);

    for (const [providerType, providerUserName] of providerMap) {
      if (providerUserName == null) {
        continue;
      }

      await appendLine(interaction, `👀 getting ${providerUserName}'s id on ${providerType}`);
      const providerUserId = await getProviderUserIdByName(providerType, providerUserName);
      if (providerUserId == null) {
        await appendLine(interaction, `🤥 couldn't find ${providerUserName} on ${providerType}`);
        continue;
      }
      await appendLine(
        interaction,
        `🤓 ${providerUserName}'s id on ${providerType} is "${providerUserId}"`
      );

      await appendLine(
        interaction,
        `👀 checking whether user has already added "${providerUserName}" from ${providerType}`
      );
      const isUserProviderExist = await checkUserProviderExist({
        userId: user.id,
        providerType,
      });
      if (isUserProviderExist) {
        await appendLine(interaction, '👌 provider exists');
        await updateUserProvider({
          userId: user.id,
          providerType,
          providerUserId,
          providerUserName: providerUserName,
        });
        await appendLine(interaction, `💅 updated name to "${providerUserName}"`);
      } else {
        await appendLine(interaction, "😵 provider doesn't exist");
        await appendLine(interaction, '👷 adding provider');
        await addUserProvider({
          userId: user.id,
          providerType: providerType,
          providerUserId,
          providerUserName: providerUserName,
        });
      }

      if (interaction.guildId == null) {
        continue;
      }

      await appendLine(interaction, `👀 checking whether user is already being spy on`);
      const isUserSubscribed = await checkUserSubscribed({
        discordGuildId: interaction.guildId,
        userId: user.id,
      });
      if (isUserSubscribed) {
        await appendLine(interaction, '🕵️ yes');
        continue;
      } else {
        await appendLine(interaction, '😵 user is not');
        await appendLine(interaction, '👷 setting up spy');
      }

      await subscribeUser({
        discordGuildId: interaction.guildId,
        userId: user.id,
      });
      await appendLine(interaction, '🕵️ done');
    }
  },
});

async function appendLine(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<Message<boolean>> {
  const reply = await interaction.fetchReply();
  return interaction.editReply({ content: reply.content + '\n' + content });
}

function editLastLine(message: Message<boolean>, content: string): Promise<Message<boolean>> {
  return message.edit({
    content: message.content.split('\n').slice(0, -1).concat(content).join('\n'),
  });
}
