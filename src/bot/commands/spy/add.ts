import { addUser } from '../../../supabase/user/addUser.js';
import { getAnilistUserIdByName } from '../../../supabase/functions/getAnilistUserIdByName.js';
import { createSubcommand } from '../utils/createCommand.js';
import { checkUserExist } from '../../../supabase/user/checkUserExist.js';
import { addSubscribedUser } from '../../../supabase/server/addSubscribedUser.js';
import { getUserByDiscordId } from '../../../supabase/user/getUserByDiscordId.js';
import { checkUserSubscribed } from '../../../supabase/server/checkSubscribedUserExist.js';

export const spyAddSubcommand = createSubcommand({
  name: 'add',
  description: 'Add user to the spying list.',
  // prettier-ignore
  customizeBuilder: b => b
    .addUserOption(o => o
      .setName('member')
      .setDescription('Discord user to spy on.')
      .setRequired(true)
    )
    .addStringOption(o => o
      .setName('anilist-name')
      .setDescription('Anilist user name.')
      .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({ ephemeral: true });

    const member = interaction.options.getUser('member');
    const anilistName = interaction.options.getString('anilist-name');

    if (!member || !anilistName) {
      await interaction.followUp({
        content: 'input user and anilist name.',
        ephemeral: true,
      });
      return;
    }

    const anilistId = await getAnilistUserIdByName(anilistName);

    if (anilistId == null) {
      await interaction.followUp({
        content: "such anilist user doesn't exist.",
        ephemeral: true,
      });
      return;
    }

    if (!interaction.guildId) {
      await interaction.followUp({
        content: 'do it on the server.',
        ephemeral: true,
      });
      return;
    }

    const isUserAlreadyExist = await checkUserExist({ anilistId, discordId: member.id });

    const user = isUserAlreadyExist
      ? await getUserByDiscordId(member.id)
      : await addUser({ anilistId, discordUserId: member.id });

    if (!user) {
      await interaction.followUp({
        content: "unlucky for you, ask to fix it, author thought it's impossible.",
        ephemeral: true,
      });
      return;
    }

    const isUserIsAlreadySubscribed = await checkUserSubscribed({
      discordGuildId: interaction.guildId,
      userId: user.id,
    });

    if (isUserIsAlreadySubscribed) {
      await interaction.followUp({
        content: "user's already being spy on.",
        ephemeral: true,
      });
      return;
    }

    await addSubscribedUser({
      discordGuildId: interaction.guildId,
      userId: user.id,
    });

    await interaction.followUp({
      content: `spying on ${member.displayName}.`,
      ephemeral: true,
    });
  },
});
