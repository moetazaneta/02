import { CommandInteraction } from 'discord.js';

export function invariant(
  interaction: CommandInteraction,
  condition: boolean,
  errorMessage: string
): asserts condition {
  if (!condition) {
    console.log(errorMessage);
    interaction.reply(errorMessage);
    throw new Error(errorMessage);
  }
}
