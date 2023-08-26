import { createCommand } from '../utils/createCommand.js';
import { spyAddSubcommand } from './add.js';
import { spyChannelSubcommand } from './channel.js';
import { spyRemoveSubcommand } from './remove.js';

export const spyCommand = createCommand({
  name: 'spy',
  description: 'Spy related commands.',
  subcommands: [spyAddSubcommand, spyRemoveSubcommand, spyChannelSubcommand],
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply({
      content: 'how?',
      ephemeral: true,
    });
  },
});
