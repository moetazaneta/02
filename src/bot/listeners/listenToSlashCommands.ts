import { Events, InteractionReplyOptions, codeBlock } from 'discord.js';
import { commands } from '../commands/index.js';
import { client } from '../discord/client.js';

export function listenToSlashCommands() {
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp('followUp not implemented');
      } else {
        await interaction.reply('reply not implemented');
      }
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      const errorCodeBlock = codeBlock(JSON.stringify(error, null, 2));
      const payload: InteractionReplyOptions = {
        content: 'There was an error while executing this command!' + '\n' + errorCodeBlock,
        ephemeral: true,
      };

      console.log('error in', command);
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(payload);
      } else {
        await interaction.reply(payload);
      }
    }
  });
}
