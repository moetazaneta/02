import { Routes } from 'discord.js';
import { env } from '../../../services/env.js';
import { rest } from '../../rest.js';
import { commandsRegisterData } from '../index.js';

// and deploy your commands!
export async function register() {
  try {
    console.log(`Started refreshing ${commandsRegisterData.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      // Routes.applicationGuildCommands(env.discord.appId, '416175885146652702'),
      Routes.applicationCommands(env.discord.appId),
      {
        body: commandsRegisterData,
      }
    )) as any;

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
