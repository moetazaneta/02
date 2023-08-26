import { Collection } from 'discord.js';
import { spyCommand } from './spy/index.js';
import { Command } from './utils/createCommand.js';
import { pingCommand } from './ping/index.js';

export { register as registerCommands } from './utils/register.js';

const commandsArray: Command[] = [spyCommand, pingCommand];

const commandsCollection = new Collection(commandsArray.map(command => [command.name, command]));

export const commandsRegisterData = commandsArray.map(command => command.builder.toJSON());

/** Commands collection. */
export const commands = commandsCollection;
