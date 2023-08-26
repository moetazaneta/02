import { codeBlock } from 'discord.js';
import { addUser } from '../../../supabase/user/addUser.js';
import { getAnilistUserIdByName } from '../../../supabase/functions/getAnilistUserIdByName.js';
import { createSubcommand } from '../utils/createCommand.js';
import { checkUserExist } from '../../../supabase/user/checkUserExist.js';
import { removeUser } from '../../../supabase/user/removeUser.js';

export const spyRemoveSubcommand = createSubcommand({
  name: 'remove',
  description: 'Remove user from the spying list.',
  customizeBuilder: b =>
    b.addUserOption(o =>
      o.setName('member').setDescription('Discord user to stop spying on.').setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const member = interaction.options.getUser('member');

    if (!member) {
      await interaction.reply({
        content: 'select user.',
        ephemeral: true,
      });
      return;
    }

    const { error } = await removeUser({ discordUserId: member.id });

    if (error) {
      const errorCodeBlock = codeBlock(JSON.stringify(error, null, 2));
      await interaction.reply({
        content: errorCodeBlock,
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: 'unspyed.',
      ephemeral: true,
    });
  },
});
