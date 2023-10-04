import { REST } from 'discord.js';
import { env } from '../../services/env.js';

export const rest = new REST().setToken(env.discord.token);
