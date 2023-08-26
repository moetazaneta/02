import { codeBlock } from 'discord.js';
import { addUser } from '../../../supabase/user/addUser.js';
import { getAnilistUserIdByName } from '../../../supabase/functions/getAnilistUserIdByName.js';
import { createSubcommand } from '../utils/createCommand.js';
import { checkUserExist } from '../../../supabase/user/checkUserExist.js';
import { addSubscribedUser } from '../../../supabase/server/addSubscribedUser.js';
import { getUserByDiscordId } from '../../../supabase/user/getUserByDiscordId.js';
import { checkSubscribedUserExist } from '../../../supabase/server/checkSubscribedUserExist.js';

export const spyAddSubcommand = createSubcommand({
  name: 'add',
  description: 'Add user to the spying list.',
  customizeBuilder: b =>
    b
      .addUserOption(o =>
        o.setName('member').setDescription('Discord user to spy on.').setRequired(true)
      )
      .addStringOption(o =>
        o.setName('anilist-name').setDescription('Anilist user name.').setRequired(true)
      ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({ ephemeral: true });

    const member = interaction.options.getUser('member');
    const anilistName = interaction.options.getString('anilist-name');

    if (!member || !anilistName) {
      await interaction.followUp({
        content: 'select user and anilist name.',
        ephemeral: true,
      });
      return;
    }

    const anilistId = await getAnilistUserIdByName(anilistName);

    if (anilistId == null) {
      await interaction.followUp({
        content: "anilist user doesn't exist.",
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

    let user;

    if (!isUserAlreadyExist) {
      const { data: addedUser, error } = await addUser({
        anilistId,
        discordUserId: member.id,
      });
      user = addedUser?.[0] ?? null;
    } else {
      user = await getUserByDiscordId(member.id);
    }

    if (!user) {
      await interaction.followUp({
        content: 'unlucky for you, ask to fix it',
        ephemeral: true,
      });
      return;
    }

    const isUserIsAlreadySubscribed = await checkSubscribedUserExist({
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

    const { error } = await addSubscribedUser({
      discordGuildId: interaction.guildId,
      userId: user.id,
    });

    if (error != null) {
      const errorCodeBlock = codeBlock(JSON.stringify(error, null, 2));
      await interaction.followUp({
        content: errorCodeBlock,
        ephemeral: true,
      });
      return;
    }

    await interaction.followUp({
      content: 'spying.',
      ephemeral: true,
    });
  },
});
