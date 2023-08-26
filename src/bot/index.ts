import { client } from './client.js';
import { env } from '../services/env.js';
import { listenToActivitiesChanges } from './listenToActivitiesChanges.js';
import { listenToSlashCommands } from './listenToSlashCommands.js';

client.login(env.discord.token);

listenToSlashCommands();
listenToActivitiesChanges();
