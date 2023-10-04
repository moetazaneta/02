import { Routes } from 'discord.js';
import { env } from '../../../services/env.js';
import { commandsRegisterData } from '../index.js';
import { rest } from '../../discord/rest.js';

export async function register() {
  try {
    console.log(`Started refreshing ${commandsRegisterData.length} application (/) commands.`);

    const data = (await rest.put(Routes.applicationCommands(env.discord.appId), {
      body: commandsRegisterData,
    })) as any;

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}
