import { createSubcommand } from '../utils/createCommand.js';
import { removeUser } from '../../../supabase/user/removeUser.js';

export const spyRemoveSubcommand = createSubcommand({
  name: 'remove',
  description: 'Remove user from the spying list.',
  // prettier-ignore
  customizeBuilder: b => b
    .addUserOption(o => o
      .setName('member')
      .setDescription('Discord user to stop spying on.')
      .setRequired(true)
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

    await removeUser({ discordUserId: member.id });

    await interaction.reply({
      content: 'unspyed.',
      ephemeral: true,
    });
  },
});
