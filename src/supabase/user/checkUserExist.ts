import { Provider } from '../../types/index.js';
import { client } from '../client.js';

/** Checks whether user exists or not. */
export async function checkUserExist(discordUserId: string) {
  // prettier-ignore
  const { data, error } = await client
    .from('users')
    .select('*')
    .or(`discord_id.eq.${discordUserId}`);

  return data != null && data.length > 0;
}
