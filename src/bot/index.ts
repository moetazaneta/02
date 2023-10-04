import { client } from './discord/client.js';
import { env } from '../services/env.js';
import { listenToActivitiesChanges } from './listeners/listenToActivitiesChanges.js';
import { listenToSlashCommands } from './listeners/listenToSlashCommands.js';

client.login(env.discord.token);

listenToSlashCommands();
listenToActivitiesChanges();
