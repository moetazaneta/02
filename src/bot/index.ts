import { client } from './client.js';
import { env } from '../services/env.js';
import { listenToActivitiesChanges } from './listenToActivitiesChanges.js';

client.login(env.discord.token);

listenToActivitiesChanges();
