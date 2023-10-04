import { createCommand } from '../utils/createCommand.js';

const emoji_02 = '<:02:467828517472567296>';

export const pingCommand = createCommand({
  name: 'ping',
  description: 'test bot',
  // prettier-ignore
  customizeBuilder: b => b
    .addBooleanOption(o => o
      .setName('ephemeral')
      .setDescription('is ephemeral?')
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;

    await interaction.reply({
      content: emoji_02,
      ephemeral,
    });
  },
});
