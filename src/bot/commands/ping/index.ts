import { SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../utils/createCommand.js';

export const pingCommand = createCommand({
  name: 'ping',
  description: 'Test bot.',
  customizeBuilder: b =>
    b.addBooleanOption(o =>
      o.setName('ephemeral').setDescription('Is ephemeral.')
    ) as SlashCommandBuilder,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;

    await interaction.reply({
      content: '<:02:467828517472567296>',
      ephemeral,
    });
  },
});
