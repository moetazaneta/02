import { codeBlock } from 'discord.js';
import { addUser } from '../../../supabase/user/addUser.js';
import { getAnilistUserIdByName } from '../../../supabase/functions/getAnilistUserIdByName.js';
import { createSubcommand } from '../utils/createCommand.js';
import { checkUserExist } from '../../../supabase/user/checkUserExist.js';
import { removeUser } from '../../../supabase/user/removeUser.js';
import { addChannel } from '../../../supabase/server/addChannel.js';

export const spyChannelSubcommand = createSubcommand({
  name: 'channel',
  description: 'Choose channel to post spy log.',
  customizeBuilder: b =>
    b.addChannelOption(o => o.setName('channel').setDescription('Channel.').setRequired(true)),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const channel = interaction.options.getChannel('channel');

    if (!channel) {
      await interaction.reply({
        content: 'channel user.',
        ephemeral: true,
      });
      return;
    }

    if (!interaction.guildId) {
      await interaction.reply({
        content: 'do it on the server.',
        ephemeral: true,
      });
      return;
    }

    const { error } = await addChannel({ guildId: interaction.guildId, channelId: channel.id });

    if (error) {
      const errorCodeBlock = codeBlock(JSON.stringify(error, null, 2));
      await interaction.reply({
        content: errorCodeBlock,
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: 'good.',
      ephemeral: true,
    });
  },
});
