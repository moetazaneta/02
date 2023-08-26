import { createSubcommand } from '../utils/createCommand.js';
import { addChannel } from '../../../supabase/server/addChannel.js';
import { removeChannel } from '../../../supabase/server/removeChannel.js';

export const spyChannelSubcommand = createSubcommand({
  name: 'channel',
  description: 'Choose channel to post spy log.',
  // prettier-ignore
  customizeBuilder: b => b
    .addChannelOption(o => o
      .setName('channel')
      .setDescription('Channel.')
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

    const channel = interaction.options.getChannel('channel');

    if (!channel) {
      await removeChannel({ guildId: interaction.guildId });

      await interaction.reply({
        content: 'removed spy log channel for this server.',
        ephemeral: true,
      });
      return;
    }

    await addChannel({ guildId: interaction.guildId, channelId: channel.id });

    await interaction.reply({
      content: 'good.',
      ephemeral: true,
    });
  },
});
